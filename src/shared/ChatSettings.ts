export type OpenAIReasoningEffort = "low" | "medium" | "high"

export interface ChatSettings {
	mode: "plan" | "act"
	preferredLanguage?: string
	openAIReasoningEffort?: OpenAIReasoningEffort
}

export type PartialChatSettings = Partial<ChatSettings>

<<<<<<< HEAD
// Type for chat settings stored in workspace (excludes in-memory mode)
export type StoredChatSettings = Omit<ChatSettings, "mode">

=======
>>>>>>> 16bc1c863785d2e3350bd9c2baa4bc31be43087d
export const DEFAULT_CHAT_SETTINGS: ChatSettings = {
	mode: "act",
	preferredLanguage: "English",
	openAIReasoningEffort: "medium",
}
