import { Empty } from "@/generated/grpc-js/cline/common"
import { Controller } from ".."
import { SetAutoCompletionRequest, TestAutoCompletionResponse } from "@/shared/proto/cline/business"
//huqb
import { updateAutocompleteConfig } from "@continuedev/core/util/codaiConfigUtil"
import OpenAI from "openai"
import { EncryptUtil, getPluginVersion } from "@/utils/encrypt"

// Business logic for setting auto-completion information
export async function testAutoCompletion(
	_controller: Controller,
	request: SetAutoCompletionRequest,
): Promise<TestAutoCompletionResponse> {
	// TODO: Implement business logic for testing auto-completion information

	let output = ""
	let result = true
	try {
		const modelId = request?.autoCompletion?.model
		const client = new OpenAI({
			baseURL: request?.autoCompletion?.apiBase,
			apiKey: request?.autoCompletion?.apiKey,
			defaultHeaders: {},
		})
		let openAiMessages: OpenAI.Chat.ChatCompletionMessageParam[] = [
			{ role: "system", content: "You are a good AI assistant." },
			{ role: "user", content: "This is a test, you just need to answer 'success'" },
		]
		const stream = await client.chat.completions.create(
			{
				model: modelId ?? "",
				messages: openAiMessages,
				temperature: 0.1,
				max_tokens: 48,
				stream: true,
				stream_options: { include_usage: true },
			},
			// 通过 axios 的请求配置合并 headers //huqb
			{
				headers: {
					"X-Codee-Token": EncryptUtil.encrypt(request?.autoCompletion?.apiKey ?? ""), //huqb
					"X-Codee-Ver": "CodeeVsCodeExtension/" + getPluginVersion(),
				},
			},
		)
		for await (const chunk of stream) {
			const delta = chunk.choices[0]?.delta
			if (delta?.content) {
				output += delta.content
			}
		}
	} catch (error) {
		output = error.toString()
		result = false
	}
	if (output.length < 1) {
		result = false
		output = "config error"
	}

	return {
		ret: result,
		message: output,
	}
}
