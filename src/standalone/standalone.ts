import * as grpc from "@grpc/grpc-js"
import { ReflectionService } from "@grpc/reflection"
import * as health from "grpc-health-check"
<<<<<<< HEAD
import * as hostProviders from "@hosts/host-providers"
import { activate } from "../extension"
import { Controller } from "../core/controller"
import { extensionContext, outputChannel, postMessage } from "./vscode-context"
import { getPackageDefinition, log } from "./utils"
import { GrpcHandler, GrpcStreamingResponseHandler } from "./grpc-types"
import { addProtobusServices } from "@generated/standalone/server-setup"
import { StreamingResponseHandler } from "@/core/controller/grpc-handler"
import { ExternalHostBridgeClientManager } from "./host-bridge-client-manager"
import { ExternalWebviewProvider } from "./ExternalWebviewProvider"
import { WebviewProviderType } from "@/shared/webview/types"
import { v4 as uuidv4 } from "uuid"

async function main() {
	log("Starting standalone service...")

	hostProviders.initializeHostProviders(createWebview, new ExternalHostBridgeClientManager())
	activate(extensionContext)
	const controller = new Controller(extensionContext, outputChannel, postMessage, uuidv4())
	startProtobusService(controller)
}

function startProtobusService(controller: Controller) {
=======

import { activate } from "../extension"
import { Controller } from "../core/controller"
import { extensionContext, outputChannel, postMessage } from "./vscode-context"
import { packageDefinition, proto, log, camelToSnakeCase, snakeToCamelCase } from "./utils"
import { GrpcHandler, GrpcStreamingResponseHandler } from "./grpc-types"
import { addServices } from "./server-setup"
import { StreamingResponseHandler } from "@/core/controller/grpc-handler"

function main() {
	log("Starting service...")

	activate(extensionContext)
	const controller = new Controller(extensionContext, outputChannel, postMessage)
>>>>>>> 16bc1c863785d2e3350bd9c2baa4bc31be43087d
	const server = new grpc.Server()

	// Set up health check.
	const healthImpl = new health.HealthImplementation({ "": "SERVING" })
	healthImpl.addToServer(server)

	// Add all the handlers for the ProtoBus services to the server.
<<<<<<< HEAD
	addProtobusServices(server, controller, wrapHandler, wrapStreamingResponseHandler)

	// Create reflection service with protobus service names
	const packageDefinition = getPackageDefinition()
	const reflection = new ReflectionService(packageDefinition, {
		services: getProtobusServiceNames(packageDefinition),
	})
	reflection.addToServer(server)

	// Start the server.
	const host = process.env.PROTOBUS_ADDRESS || "127.0.0.1:50051"
	server.bindAsync(host, grpc.ServerCredentials.createInsecure(), (err) => {
		if (err) {
			log(`Error: Failed to bind to ${host}, port may be unavailable. ${err.message}`)
			process.exit(1)
		}
		server.start()
		log(`gRPC server listening on ${host}`)
	})
}

function getProtobusServiceNames(packageDefinition: { [x: string]: any }): string[] {
	// Filter service names to only include cline services
	const protobusServiceNames = Object.keys(packageDefinition).filter(
		(name) => name.startsWith("cline.") || name.startsWith("grpc.health"),
	)
	return protobusServiceNames
}

const createWebview = () => {
	return new ExternalWebviewProvider(extensionContext, outputChannel, WebviewProviderType.SIDEBAR)
}

=======
	addServices(server, proto, controller, wrapHandler, wrapStreamingResponseHandler)

	// Set up reflection.
	const reflection = new ReflectionService(packageDefinition)
	reflection.addToServer(server)

	// Start the server.
	const host = "127.0.0.1:50051"
	server.bindAsync(host, grpc.ServerCredentials.createInsecure(), (err) => {
		if (err) {
			log(`Error: Failed to bind to ${host}, port may be unavailable ${err.message}`)
			process.exit(1)
		} else {
			server.start()
			log(`gRPC server listening on ${host}`)
		}
	})
}

>>>>>>> 16bc1c863785d2e3350bd9c2baa4bc31be43087d
/**
 * Wraps a Promise-based handler function to make it compatible with gRPC's callback-based API.
 * This function converts an async handler that returns a Promise into a function that uses
 * the gRPC callback pattern.
 *
 * @template TRequest - The type of the request object
 * @template TResponse - The type of the response object
 * @param handler - The Promise-based handler function to wrap
 * @param controllerInstance - The controller instance to pass to the handler
 * @returns A gRPC-compatible callback-style handler function
 */
function wrapHandler<TRequest, TResponse>(
	handler: GrpcHandler<TRequest, TResponse>,
	controller: Controller,
): grpc.handleUnaryCall<TRequest, TResponse> {
	return async (call: grpc.ServerUnaryCall<TRequest, TResponse>, callback: grpc.sendUnaryData<TResponse>) => {
		try {
			log(`gRPC request: ${call.getPath()}`)
<<<<<<< HEAD
			const result = await handler(controller, call.request)
			callback(null, result)
=======
			const result = await handler(controller, snakeToCamelCase(call.request))
			// The grpc-js serializer expects the proto message to be in the same
			// case as the proto file. This is a work around until we find a solution.
			callback(null, camelToSnakeCase(result))
>>>>>>> 16bc1c863785d2e3350bd9c2baa4bc31be43087d
		} catch (err: any) {
			log(`gRPC handler error: ${call.getPath()}\n${err.stack}`)
			callback({
				code: grpc.status.INTERNAL,
				message: err.message || "Internal error",
			} as grpc.ServiceError)
		}
	}
}

function wrapStreamingResponseHandler<TRequest, TResponse>(
	handler: GrpcStreamingResponseHandler<TRequest, TResponse>,
	controller: Controller,
): grpc.handleServerStreamingCall<TRequest, TResponse> {
	return async (call: grpc.ServerWritableStream<TRequest, TResponse>) => {
		try {
			const requestId = call.metadata.get("request-id").pop()?.toString()
			log(`gRPC streaming request: ${call.getPath()}`)

			const responseHandler: StreamingResponseHandler = (response, isLast, sequenceNumber) => {
				try {
<<<<<<< HEAD
					call.write(response) // Use a bound version of call.write to maintain proper 'this' context
=======
					// The grpc-js serializer expects the proto message to be in the same
					// case as the proto file. This is a work around until we find a solution.
					call.write(camelToSnakeCase(response)) // Use a bound version of call.write to maintain proper 'this' context
>>>>>>> 16bc1c863785d2e3350bd9c2baa4bc31be43087d

					if (isLast === true) {
						log(`Closing stream for ${requestId}`)
						call.end()
					}
					return Promise.resolve()
				} catch (error) {
					return Promise.reject(error)
				}
			}
<<<<<<< HEAD
			await handler(controller, call.request, responseHandler, requestId)
=======
			await handler(controller, snakeToCamelCase(call.request), responseHandler, requestId)
>>>>>>> 16bc1c863785d2e3350bd9c2baa4bc31be43087d
		} catch (err: any) {
			log(`gRPC handler error: ${call.getPath()}\n${err.stack}`)
			call.destroy({
				code: grpc.status.INTERNAL,
				message: err.message || "Internal error",
			} as grpc.ServiceError)
		}
	}
}

main()
