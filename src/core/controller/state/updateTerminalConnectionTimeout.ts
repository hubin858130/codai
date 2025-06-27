<<<<<<< HEAD
import { Controller } from "../index"
import * as proto from "@/shared/proto"
import { updateGlobalState } from "../../storage/state"

export async function updateTerminalConnectionTimeout(
	controller: Controller,
	request: proto.codai.Int64Request,
): Promise<proto.codai.Int64> {
	const timeoutValue = request.value

	// Update the terminal connection timeout setting in the state
	await updateGlobalState(controller.context, "shellIntegrationTimeout", timeoutValue)

	// Broadcast state update to all webviews
	await controller.postStateToWebview()

	return proto.codai.Int64.create({ value: timeoutValue })
=======
import { Controller } from ".."
import { Int64, Int64Request } from "../../../shared/proto/common"
import { updateGlobalState } from "../../storage/state"

/**
 * Updates the terminal connection timeout setting
 * @param controller The controller instance
 * @param request The request containing the timeout value in milliseconds
 * @returns The updated timeout value
 */
export async function updateTerminalConnectionTimeout(controller: Controller, request: Int64Request): Promise<Int64> {
	try {
		const timeout = request.value

		if (typeof timeout === "number" && !isNaN(timeout) && timeout > 0) {
			// Update the global state directly
			await updateGlobalState(controller.context, "shellIntegrationTimeout", timeout)
			return Int64.create({ value: timeout })
		} else {
			console.warn(`Invalid shell integration timeout value received: ${timeout}. Expected a positive number.`)
			throw new Error("Invalid timeout value. Expected a positive number.")
		}
	} catch (error) {
		console.error(`Failed to update terminal connection timeout: ${error}`)
		throw error
	}
>>>>>>> 16bc1c863785d2e3350bd9c2baa4bc31be43087d
}
