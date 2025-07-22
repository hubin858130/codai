import { ApiConfiguration, sambanovaModels } from "@shared/api"
import { ApiKeyField } from "../common/ApiKeyField"
import { ModelSelector } from "../common/ModelSelector"
import { ModelInfoView } from "../common/ModelInfoView"
import { normalizeApiConfiguration } from "../utils/providerUtils"
import { useExtensionState } from "@/context/ExtensionStateContext"
import { useApiConfigurationHandlers } from "../utils/useApiConfigurationHandlers"
import { useTranslation } from "react-i18next"
/**
 * Props for the SambanovaProvider component
 */
interface SambanovaProviderProps {
	showModelOptions: boolean
	isPopup?: boolean
}

/**
 * The SambaNova provider configuration component
 */
export const SambanovaProvider = ({ showModelOptions, isPopup }: SambanovaProviderProps) => {
	const { apiConfiguration } = useExtensionState()
	const { handleFieldChange } = useApiConfigurationHandlers()
	const { t } = useTranslation()
	// Get the normalized configuration
	const { selectedModelId, selectedModelInfo } = normalizeApiConfiguration(apiConfiguration)

	return (
		<div>
			<ApiKeyField
				initialValue={apiConfiguration?.sambanovaApiKey || ""}
				onChange={(value) => handleFieldChange("sambanovaApiKey", value)}
				providerName="SambaNova"
				signupUrl="https://docs.sambanova.ai/cloud/docs/get-started/overview"
			/>

			{showModelOptions && (
				<>
					<ModelSelector
						models={sambanovaModels}
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
