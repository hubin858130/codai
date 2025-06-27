import { Controller } from "../index"
import { Empty } from "@shared/proto/common"
<<<<<<< HEAD
import { EmptyRequest } from "@shared/proto/common"
import { StreamingResponseHandler, getRequestRegistry } from "../grpc-handler"

// Keep track of active mcpButtonClicked subscriptions by controller ID
const activeMcpButtonClickedSubscriptions = new Map<string, StreamingResponseHandler>()
=======
import { WebviewProviderType, WebviewProviderTypeRequest } from "@shared/proto/ui"
import { StreamingResponseHandler, getRequestRegistry } from "../grpc-handler"

// Track subscriptions with their provider type
const mcpButtonClickedSubscriptions = new Map<StreamingResponseHandler, WebviewProviderType>()
>>>>>>> 16bc1c863785d2e3350bd9c2baa4bc31be43087d

/**
 * Subscribe to mcpButtonClicked events
 * @param controller The controller instance
<<<<<<< HEAD
 * @param request The empty request
=======
 * @param request The webview provider type request
>>>>>>> 16bc1c863785d2e3350bd9c2baa4bc31be43087d
 * @param responseStream The streaming response handler
 * @param requestId The ID of the request (passed by the gRPC handler)
 */
export async function subscribeToMcpButtonClicked(
<<<<<<< HEAD
	controller: Controller,
	_request: EmptyRequest,
	responseStream: StreamingResponseHandler,
	requestId?: string,
): Promise<void> {
	const controllerId = controller.id
	console.log(`[DEBUG] set up mcpButtonClicked subscription for controller ${controllerId}`)

	// Add this subscription to the active subscriptions with the controller ID
	activeMcpButtonClickedSubscriptions.set(controllerId, responseStream)

	// Register cleanup when the connection is closed
	const cleanup = () => {
		activeMcpButtonClickedSubscriptions.delete(controllerId)
=======
	_controller: Controller,
	request: WebviewProviderTypeRequest,
	responseStream: StreamingResponseHandler,
	requestId?: string,
): Promise<void> {
	const providerType = request.providerType
	console.log(`[DEBUG] set up mcpButtonClicked subscription for ${WebviewProviderType[providerType]} webview`)

	// Store the subscription with its provider type
	mcpButtonClickedSubscriptions.set(responseStream, providerType)

	// Register cleanup when the connection is closed
	const cleanup = () => {
		mcpButtonClickedSubscriptions.delete(responseStream)
>>>>>>> 16bc1c863785d2e3350bd9c2baa4bc31be43087d
	}

	// Register the cleanup function with the request registry if we have a requestId
	if (requestId) {
		getRequestRegistry().registerRequest(requestId, cleanup, { type: "mcpButtonClicked_subscription" }, responseStream)
	}
}

/**
<<<<<<< HEAD
 * Send a mcpButtonClicked event to a specific controller's subscription
 * @param controllerId The ID of the controller to send the event to
 */
export async function sendMcpButtonClickedEvent(controllerId: string): Promise<void> {
	// Get the subscription for this specific controller
	const responseStream = activeMcpButtonClickedSubscriptions.get(controllerId)

	if (!responseStream) {
		console.error(`[DEBUG] No active subscription for controller ${controllerId}`)
		return
	}

	try {
		const event = Empty.create({})
		await responseStream(
			event,
			false, // Not the last message
		)
	} catch (error) {
		console.error(`Error sending mcpButtonClicked event to controller ${controllerId}:`, error)
		// Remove the subscription if there was an error
		activeMcpButtonClickedSubscriptions.delete(controllerId)
	}
=======
 * Send a mcpButtonClicked event to active subscribers based on webview type
 * @param webviewType The type of webview that triggered the event (SIDEBAR or TAB)
 */
export async function sendMcpButtonClickedEvent(webviewType?: WebviewProviderType): Promise<void> {
	const event: Empty = Empty.create({})

	// Process all subscriptions, filtering based on the source
	const promises = Array.from(mcpButtonClickedSubscriptions.entries()).map(async ([responseStream, providerType]) => {
		// Only send to subscribers of the same type as the event source
		if (webviewType !== providerType) {
			return // Skip subscribers of different types
		}

		try {
			await responseStream(event, false)
		} catch (error) {
			console.error(`Error sending mcpButtonClicked event to ${WebviewProviderType[providerType]}:`, error)
			mcpButtonClickedSubscriptions.delete(responseStream)
		}
	})

	await Promise.all(promises)
>>>>>>> 16bc1c863785d2e3350bd9c2baa4bc31be43087d
}
