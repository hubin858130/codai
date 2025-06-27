import { Controller } from ".."
<<<<<<< HEAD
import { Boolean } from "../../../shared/proto/common"
=======
import { Empty } from "../../../shared/proto/common"
>>>>>>> 16bc1c863785d2e3350bd9c2baa4bc31be43087d
import { TogglePlanActModeRequest } from "../../../shared/proto/state"
import {
	convertProtoChatContentToChatContent,
	convertProtoChatSettingsToChatSettings,
} from "@shared/proto-conversions/state/chat-settings-conversion"

/**
 * Toggles between Plan and Act modes
 * @param controller The controller instance
 * @param request The request containing the chat settings and optional chat content
 * @returns An empty response
 */
<<<<<<< HEAD
export async function togglePlanActMode(controller: Controller, request: TogglePlanActModeRequest): Promise<Boolean> {
=======
export async function togglePlanActMode(controller: Controller, request: TogglePlanActModeRequest): Promise<Empty> {
>>>>>>> 16bc1c863785d2e3350bd9c2baa4bc31be43087d
	try {
		if (!request.chatSettings) {
			throw new Error("Chat settings are required")
		}

		const chatSettings = convertProtoChatSettingsToChatSettings(request.chatSettings)
		const chatContent = request.chatContent ? convertProtoChatContentToChatContent(request.chatContent) : undefined

		// Call the existing controller implementation
<<<<<<< HEAD
		const sentMessage = await controller.togglePlanActModeWithChatSettings(chatSettings, chatContent)

		return Boolean.create({
			value: sentMessage,
		})
=======
		await controller.togglePlanActModeWithChatSettings(chatSettings, chatContent)

		return Empty.create()
>>>>>>> 16bc1c863785d2e3350bd9c2baa4bc31be43087d
	} catch (error) {
		console.error("Failed to toggle Plan/Act mode:", error)
		throw error
	}
}
