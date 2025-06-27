import { Controller } from ".."
<<<<<<< HEAD
import { Empty } from "../../../shared/proto/common"
import { ResetStateRequest } from "../../../shared/proto/state"
import { resetGlobalState, resetWorkspaceState } from "../../../core/storage/state"
=======
import { Empty, EmptyRequest } from "../../../shared/proto/common"
import { resetExtensionState } from "../../../core/storage/state"
>>>>>>> 16bc1c863785d2e3350bd9c2baa4bc31be43087d
import * as vscode from "vscode"
import { sendChatButtonClickedEvent } from "../ui/subscribeToChatButtonClicked"

/**
 * Resets the extension state to its defaults
 * @param controller The controller instance
<<<<<<< HEAD
 * @param request The reset state request containing the global flag
 * @returns An empty response
 */
export async function resetState(controller: Controller, request: ResetStateRequest): Promise<Empty> {
	try {
		if (request.global) {
			vscode.window.showInformationMessage("Resetting global state...")
			await resetGlobalState(controller.context)
		} else {
			vscode.window.showInformationMessage("Resetting workspace state...")
			await resetWorkspaceState(controller.context)
		}
=======
 * @param request An empty request (no parameters needed)
 * @returns An empty response
 */
export async function resetState(controller: Controller, request: EmptyRequest): Promise<Empty> {
	try {
		vscode.window.showInformationMessage("Resetting state...")
		await resetExtensionState(controller.context)
>>>>>>> 16bc1c863785d2e3350bd9c2baa4bc31be43087d

		if (controller.task) {
			controller.task.abortTask()
			controller.task = undefined
		}

		vscode.window.showInformationMessage("State reset")
		await controller.postStateToWebview()

		await sendChatButtonClickedEvent(controller.id)

		return Empty.create()
	} catch (error) {
		console.error("Error resetting state:", error)
		vscode.window.showErrorMessage(`Failed to reset state: ${error instanceof Error ? error.message : String(error)}`)
		throw error
	}
}
