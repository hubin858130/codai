import * as vscode from "vscode"
import { Controller } from "../index"
import { EmptyRequest } from "../../../shared/proto/common"
import { StreamingResponseHandler, getRequestRegistry } from "../grpc-handler"

<<<<<<< HEAD
// Keep track of active state subscriptions by controller ID
const activeStateSubscriptions = new Map<string, StreamingResponseHandler>()
=======
// Keep track of active state subscriptions
const activeStateSubscriptions = new Set<StreamingResponseHandler>()
>>>>>>> 16bc1c863785d2e3350bd9c2baa4bc31be43087d

/**
 * Subscribe to state updates
 * @param controller The controller instance
 * @param request The empty request
 * @param responseStream The streaming response handler
 * @param requestId The ID of the request (passed by the gRPC handler)
 */
export async function subscribeToState(
	controller: Controller,
	request: EmptyRequest,
	responseStream: StreamingResponseHandler,
	requestId?: string,
): Promise<void> {
<<<<<<< HEAD
	const controllerId = controller.id

=======
>>>>>>> 16bc1c863785d2e3350bd9c2baa4bc31be43087d
	// Send the initial state
	const initialState = await controller.getStateToPostToWebview()
	const initialStateJson = JSON.stringify(initialState)

<<<<<<< HEAD
	console.log(`[DEBUG] set up state subscription for controller ${controllerId}`)
=======
	console.log("[DEBUG] set up state subscription")
>>>>>>> 16bc1c863785d2e3350bd9c2baa4bc31be43087d

	await responseStream({
		stateJson: initialStateJson,
	})

<<<<<<< HEAD
	// Add this subscription to the active subscriptions with the controller ID
	activeStateSubscriptions.set(controllerId, responseStream)

	// Register cleanup when the connection is closed
	const cleanup = () => {
		activeStateSubscriptions.delete(controllerId)
		console.log(`[DEBUG] Cleaned up state subscription for controller ${controllerId}`)
=======
	// Add this subscription to the active subscriptions
	activeStateSubscriptions.add(responseStream)

	// Register cleanup when the connection is closed
	const cleanup = () => {
		activeStateSubscriptions.delete(responseStream)
		console.log("[DEBUG] Cleaned up state subscription")
>>>>>>> 16bc1c863785d2e3350bd9c2baa4bc31be43087d
	}

	// Register the cleanup function with the request registry if we have a requestId
	if (requestId) {
		getRequestRegistry().registerRequest(requestId, cleanup, { type: "state_subscription" }, responseStream)
	}
}

/**
<<<<<<< HEAD
 * Send a state update to a specific controller's subscription
 * @param controllerId The ID of the controller to send the state to
 * @param state The state to send
 */
export async function sendStateUpdate(controllerId: string, state: any): Promise<void> {
	// Get the subscription for this specific controller
	const responseStream = activeStateSubscriptions.get(controllerId)

	if (!responseStream) {
		console.log(`[DEBUG] No active state subscription for controller ${controllerId}`)
		return
	}

	try {
		const stateJson = JSON.stringify(state)
		await responseStream(
			{
				stateJson,
			},
			false, // Not the last message
		)
		console.log(`[DEBUG] sending followup state to controller ${controllerId}`, stateJson.length, "chars")
	} catch (error) {
		console.error(`Error sending state update to controller ${controllerId}:`, error)
		// Remove the subscription if there was an error
		activeStateSubscriptions.delete(controllerId)
	}
=======
 * Send a state update to all active subscribers
 * @param state The state to send
 */
export async function sendStateUpdate(state: any): Promise<void> {
	const stateJson = JSON.stringify(state)

	// Send the update to all active subscribers
	const promises = Array.from(activeStateSubscriptions).map(async (responseStream) => {
		try {
			// The issue might be that we're not properly formatting the response
			// Let's ensure we're sending a properly formatted State message
			await responseStream(
				{
					stateJson,
				},
				false, // Not the last message
			)
			console.log("[DEBUG] sending followup state", stateJson.length, "chars")
		} catch (error) {
			console.error("Error sending state update:", error)
			// Remove the subscription if there was an error
			activeStateSubscriptions.delete(responseStream)
		}
	})

	await Promise.all(promises)
>>>>>>> 16bc1c863785d2e3350bd9c2baa4bc31be43087d
}
