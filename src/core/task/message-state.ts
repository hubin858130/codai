import { combineApiRequests } from "@/shared/combineApiRequests"
import { ensureTaskDirectoryExists, saveApiConversationHistory, saveClineMessages } from "../storage/disk"
import * as vscode from "vscode"
import { ClineMessage } from "@/shared/ExtensionMessage"
import { getApiMetrics } from "@/shared/getApiMetrics"
import { combineCommandSequences } from "@/shared/combineCommandSequences"
import { findLastIndex } from "@/shared/array"
import getFolderSize from "get-folder-size"
import os from "os"
import * as path from "path"
import CheckpointTracker from "@integrations/checkpoints/CheckpointTracker"
import { HistoryItem } from "@/shared/HistoryItem"
import Anthropic from "@anthropic-ai/sdk"
import { TaskState } from "./TaskState"
import { getCwd, getDesktopDir } from "@/utils/path"

interface MessageStateHandlerParams {
	context: vscode.ExtensionContext
	taskId: string
	taskIsFavorited?: boolean
	updateTaskHistory: (historyItem: HistoryItem) => Promise<HistoryItem[]>
	taskState: TaskState
}

export class MessageStateHandler {
	private apiConversationHistory: Anthropic.MessageParam[] = []
	private clineMessages: ClineMessage[] = []
	private taskIsFavorited: boolean
	private checkpointTracker: CheckpointTracker | undefined
	private updateTaskHistory: (historyItem: HistoryItem) => Promise<HistoryItem[]>
	private context: vscode.ExtensionContext
	private taskId: string
	private taskState: TaskState

	constructor(params: MessageStateHandlerParams) {
		this.context = params.context
		this.taskId = params.taskId
		this.taskState = params.taskState
		this.taskIsFavorited = params.taskIsFavorited ?? false
		this.updateTaskHistory = params.updateTaskHistory
	}

	setCheckpointTracker(tracker: CheckpointTracker | undefined) {
		this.checkpointTracker = tracker
	}

	getApiConversationHistory(): Anthropic.MessageParam[] {
		return this.apiConversationHistory
	}

	setApiConversationHistory(newHistory: Anthropic.MessageParam[]): void {
		this.apiConversationHistory = newHistory
	}

	getClineMessages(): ClineMessage[] {
		return this.clineMessages
	}

	setClineMessages(newMessages: ClineMessage[]) {
		this.clineMessages = newMessages
	}

	async saveClineMessagesAndUpdateHistory(): Promise<void> {
		try {
			await saveClineMessages(this.context, this.taskId, this.clineMessages)

			// combined as they are in ChatView
			const apiMetrics = getApiMetrics(combineApiRequests(combineCommandSequences(this.clineMessages.slice(1))))
			const taskMessage = this.clineMessages[0] // first message is always the task say
			const lastRelevantMessage =
				this.clineMessages[
					findLastIndex(
						this.clineMessages,
						(message) => !(message.ask === "resume_task" || message.ask === "resume_completed_task"),
					)
				]
			const taskDir = await ensureTaskDirectoryExists(this.context, this.taskId)
			let taskDirSize = 0
			try {
				// getFolderSize.loose silently ignores errors
				// returns # of bytes, size/1000/1000 = MB
				taskDirSize = await getFolderSize.loose(taskDir)
			} catch (error) {
				console.error("Failed to get task directory size:", taskDir, error)
			}
			const cwd = await getCwd(getDesktopDir())
			await this.updateTaskHistory({
				id: this.taskId,
				ts: lastRelevantMessage.ts,
				task: taskMessage.text ?? "",
				tokensIn: apiMetrics.totalTokensIn,
				tokensOut: apiMetrics.totalTokensOut,
				cacheWrites: apiMetrics.totalCacheWrites,
				cacheReads: apiMetrics.totalCacheReads,
				totalCost: apiMetrics.totalCost,
				size: taskDirSize,
				shadowGitConfigWorkTree: await this.checkpointTracker?.getShadowGitConfigWorkTree(),
				cwdOnTaskInitialization: cwd,
				conversationHistoryDeletedRange: this.taskState.conversationHistoryDeletedRange,
				isFavorited: this.taskIsFavorited,
			})
		} catch (error) {
			console.error("Failed to save cline messages:", error)
		}
	}

	async addToApiConversationHistory(message: Anthropic.MessageParam) {
		//huqb
		// this.apiConversationHistory.push(message)
		// await saveApiConversationHistory(this.context, this.taskId, this.apiConversationHistory)
		if (message.role === "assistant") {
			//huqb
			const thinkTagRegex = /<([tT][hH][iI][nN][kK])([iI][nN][gG])?[^>]*>[\s\S]*?<\/\1\2?>/g
			if (Array.isArray(message.content)) {
				// 处理content为数组的情况
				message.content = message.content.map((content) => {
					// console.log("@@@@@@1,content", content)
					// console.log("@@@@@1,content type", content.type)
					if (content.type === "text") {
						return {
							...content,
							text: content.text.replace(thinkTagRegex, ""),
						}
					}
					return content
				})
			} else if (typeof message.content === "string") {
				//console.log("@@@@@@2,message.content", message.content)
				// 处理content为字符串的情况
				message.content = message.content.replace(thinkTagRegex, "")
				//console.log("@@@@@@2.5,message.content", message.content)
			}
		}
		// 创建一个新的消息对象，避免修改原始消息
		const processedMessage: Anthropic.MessageParam = {
			role: message.role,
			content: message.content,
		}
		this.apiConversationHistory.push(processedMessage)
		await saveApiConversationHistory(this.context, this.taskId, this.apiConversationHistory)
	}

	async overwriteApiConversationHistory(newHistory: Anthropic.MessageParam[]): Promise<void> {
		this.apiConversationHistory = newHistory
		await saveApiConversationHistory(this.context, this.taskId, this.apiConversationHistory)
	}

	async addToClineMessages(message: ClineMessage) {
		// these values allow us to reconstruct the conversation history at the time this cline message was created
		// it's important that apiConversationHistory is initialized before we add cline messages
		message.conversationHistoryIndex = this.apiConversationHistory.length - 1 // NOTE: this is the index of the last added message which is the user message, and once the clinemessages have been presented we update the apiconversationhistory with the completed assistant message. This means when resetting to a message, we need to +1 this index to get the correct assistant message that this tool use corresponds to
		message.conversationHistoryDeletedRange = this.taskState.conversationHistoryDeletedRange
		this.clineMessages.push(message)
		await this.saveClineMessagesAndUpdateHistory()
	}

	async overwriteClineMessages(newMessages: ClineMessage[]) {
		this.clineMessages = newMessages
		await this.saveClineMessagesAndUpdateHistory()
	}

	async updateClineMessage(index: number, updates: Partial<ClineMessage>): Promise<void> {
		if (index < 0 || index >= this.clineMessages.length) {
			throw new Error(`Invalid message index: ${index}`)
		}

		// Apply updates to the message
		Object.assign(this.clineMessages[index], updates)

		// Save changes and update history
		await this.saveClineMessagesAndUpdateHistory()
	}
}
