// AUTO-GENERATED FILE - DO NOT MODIFY DIRECTLY
// Generated by proto/build-proto.js

// Import all method implementations
import { registerMethod } from "./index"
import { accountLoginClicked } from "./accountLoginClicked"
import { accountLogoutClicked } from "./accountLogoutClicked"
import { authStateChanged } from "./authStateChanged"
import { fetchUserCreditsData } from "./fetchUserCreditsData"
import { subscribeToAuthCallback } from "./subscribeToAuthCallback"

// Streaming methods for this service
export const streamingMethods = [
  "subscribeToAuthCallback"
]

// Register all account service methods
export function registerAllMethods(): void {
	// Register each method with the registry
	registerMethod("accountLoginClicked", accountLoginClicked)
	registerMethod("accountLogoutClicked", accountLogoutClicked)
	registerMethod("authStateChanged", authStateChanged)
	registerMethod("fetchUserCreditsData", fetchUserCreditsData)
	registerMethod("subscribeToAuthCallback", subscribeToAuthCallback, { isStreaming: true })
}