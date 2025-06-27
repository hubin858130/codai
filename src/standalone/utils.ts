import * as fs from "fs"
<<<<<<< HEAD
import * as protoLoader from "@grpc/proto-loader"
import * as health from "grpc-health-check"
import { StreamingCallbacks } from "@/hosts/host-provider-types"
=======
import * as grpc from "@grpc/grpc-js"
import * as protoLoader from "@grpc/proto-loader"
import * as health from "grpc-health-check"
>>>>>>> 16bc1c863785d2e3350bd9c2baa4bc31be43087d

const log = (...args: unknown[]) => {
	const timestamp = new Date().toISOString()
	console.log(`[${timestamp}]`, "#bot.cline.server.ts", ...args)
}

<<<<<<< HEAD
function getPackageDefinition() {
	// Load service definitions.
	const descriptorSet = fs.readFileSync("proto/descriptor_set.pb")
	const descriptorDefs = protoLoader.loadFileDescriptorSetFromBuffer(descriptorSet)
	const healthDef = protoLoader.loadSync(health.protoPath)
	const packageDefinition = { ...descriptorDefs, ...healthDef }
	return packageDefinition
}

/**
 * Converts an AsyncIterable to a callback-based API
 * @param stream The AsyncIterable stream to process
 * @param callbacks The callbacks to invoke for stream events
 */
async function asyncIteratorToCallbacks<T>(stream: AsyncIterable<T>, callbacks: StreamingCallbacks<T>): Promise<void> {
	try {
		// Process each item in the stream
		for await (const response of stream) {
			callbacks.onResponse && callbacks.onResponse(response)
		}
		// Stream completed successfully
		callbacks.onComplete && callbacks.onComplete()
	} catch (err) {
		const error = err instanceof Error ? err : new Error(String(err))
		if (callbacks.onError) {
			callbacks.onError(error)
		} else {
			log(`Host bridge RPC error: ${error}`)
		}
	}
}

export { getPackageDefinition, log, asyncIteratorToCallbacks }
=======
// Load service definitions.
const descriptorSet = fs.readFileSync("proto/descriptor_set.pb")
const clineDef = protoLoader.loadFileDescriptorSetFromBuffer(descriptorSet)
const healthDef = protoLoader.loadSync(health.protoPath)
const packageDefinition = { ...clineDef, ...healthDef }
const proto = grpc.loadPackageDefinition(packageDefinition) as unknown

// Helper function to convert camelCase to snake_case
function camelToSnakeCase(obj: any): any {
	if (obj === null || typeof obj !== "object") {
		return obj
	}

	if (Array.isArray(obj)) {
		return obj.map(camelToSnakeCase)
	}

	return Object.keys(obj).reduce((acc: any, key: string) => {
		// Convert key from camelCase to snake_case
		const snakeKey = key
			.replace(/([A-Z])/g, "_$1")
			.replace(/^_+/, "")
			.toLowerCase()

		// Convert value recursively if it's an object
		const value = obj[key]
		acc[snakeKey] = camelToSnakeCase(value)

		return acc
	}, {})
}

// Helper function to convert snake_case to camelCase
function snakeToCamelCase(obj: any): any {
	if (obj === null || typeof obj !== "object") {
		return obj
	}

	if (Array.isArray(obj)) {
		return obj.map(snakeToCamelCase)
	}

	return Object.keys(obj).reduce((acc: any, key: string) => {
		// Convert key from snake_case to camelCase
		const camelKey = key.replace(/_([a-z0-9])/g, (_, char) => char.toUpperCase())

		// Convert value recursively if it's an object
		const value = obj[key]
		acc[camelKey] = snakeToCamelCase(value)

		return acc
	}, {})
}

export { packageDefinition, proto, log, camelToSnakeCase, snakeToCamelCase }
>>>>>>> 16bc1c863785d2e3350bd9c2baa4bc31be43087d
