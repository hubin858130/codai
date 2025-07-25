// AUTO-GENERATED FILE - DO NOT MODIFY DIRECTLY
// Generated by scripts/build-proto.mjs

import { createServiceRegistry, ServiceMethodHandler, StreamingMethodHandler } from "../grpc-service"
import { StreamingResponseHandler } from "../grpc-handler"
import { registerAllMethods } from "./methods"

// Create browser service registry
const browserService = createServiceRegistry("browser")

// Export the method handler types and registration function
export type BrowserMethodHandler = ServiceMethodHandler
export type BrowserStreamingMethodHandler = StreamingMethodHandler
export const registerMethod = browserService.registerMethod

// Export the request handlers
export const handleBrowserServiceRequest = browserService.handleRequest
export const handleBrowserServiceStreamingRequest = browserService.handleStreamingRequest
export const isStreamingMethod = browserService.isStreamingMethod

// Register all browser methods
registerAllMethods()