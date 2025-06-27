<<<<<<< HEAD
import { LanguageModelChatSelector } from "../../proto/models"
=======
import { VsCodeLmModel } from "../../proto/models"
>>>>>>> 16bc1c863785d2e3350bd9c2baa4bc31be43087d

/**
 * Represents a VS Code language model in the native VS Code format
 */
export interface VsCodeNativeModel {
	vendor?: string
	family?: string
	version?: string
	id?: string
}

/**
 * Converts VS Code native model format to protobuf format
 */
<<<<<<< HEAD
export function convertVsCodeNativeModelsToProtoModels(models: VsCodeNativeModel[]): LanguageModelChatSelector[] {
=======
export function convertVsCodeNativeModelsToProtoModels(models: VsCodeNativeModel[]): VsCodeLmModel[] {
>>>>>>> 16bc1c863785d2e3350bd9c2baa4bc31be43087d
	return (models || []).map((model) => ({
		vendor: model.vendor || "",
		family: model.family || "",
		version: model.version || "",
		id: model.id || "",
	}))
}
