// AUTO-GENERATED FILE - DO NOT MODIFY DIRECTLY
// Generated by scripts/build-proto.mjs

import { createServiceRegistry, ServiceMethodHandler, StreamingMethodHandler } from "../grpc-service"
import { StreamingResponseHandler } from "../grpc-handler"
import { registerAllMethods } from "./methods"

// Create mcp service registry
const mcpService = createServiceRegistry("mcp")

// Export the method handler types and registration function
export type McpMethodHandler = ServiceMethodHandler
export type McpStreamingMethodHandler = StreamingMethodHandler
export const registerMethod = mcpService.registerMethod

// Export the request handlers
export const handleMcpServiceRequest = mcpService.handleRequest
export const handleMcpServiceStreamingRequest = mcpService.handleStreamingRequest
export const isStreamingMethod = mcpService.isStreamingMethod

// Register all mcp methods
registerAllMethods()