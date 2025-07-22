import { ApiConfiguration, deepSeekModels } from "@shared/api"
import { ApiKeyField } from "../common/ApiKeyField"
import { ModelSelector } from "../common/ModelSelector"
import { ModelInfoView } from "../common/ModelInfoView"
import { normalizeApiConfiguration } from "../utils/providerUtils"
import { useApiConfigurationHandlers } from "../utils/useApiConfigurationHandlers"
import { useExtensionState } from "@/context/ExtensionStateContext"
import { useTranslation } from "react-i18next"
/**
 * Props for the DeepSeekProvider component
 */
interface DeepSeekProviderProps {
	showModelOptions: boolean
	isPopup?: boolean
}

/**
 * The DeepSeek provider configuration component
 */
export const DeepSeekProvider = ({ showModelOptions, isPopup }: DeepSeekProviderProps) => {
	const { apiConfiguration } = useExtensionState()
	const { handleFieldChange } = useApiConfigurationHandlers()
	const { t } = useTranslation()
	// Get the normalized configuration
	const { selectedModelId, selectedModelInfo } = normalizeApiConfiguration(apiConfiguration)

	return (
		<div>
			<ApiKeyField
				initialValue={apiConfiguration?.deepSeekApiKey || ""}
				onChange={(value) => handleFieldChange("deepSeekApiKey", value)}
				providerName="DeepSeek"
				signupUrl="https://www.deepseek.com/"
			/>

			{showModelOptions && (
				<>
					<ModelSelector
						models={deepSeekModels}
						selectedModelId={selectedModelId}
						onChange={(e: any) => handleFieldChange("apiModelId", e.target.value)}
						label={t("settings.api.model")}
					/>

					<ModelInfoView selectedModelId={selectedModelId} modelInfo={selectedModelInfo} isPopup={isPopup} />
				</>
			)}
		</div>
	)
}
