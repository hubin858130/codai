import { ApiConfiguration } from "@shared/api"
import { DebouncedTextField } from "../common/DebouncedTextField"
import { ApiKeyField } from "../common/ApiKeyField"
import { useExtensionState } from "@/context/ExtensionStateContext"
import { useApiConfigurationHandlers } from "../utils/useApiConfigurationHandlers"
import { useTranslation } from "react-i18next"
/**
 * Props for the TogetherProvider component
 */
interface TogetherProviderProps {
	showModelOptions: boolean
	isPopup?: boolean
}

/**
 * The Together provider configuration component
 */
export const TogetherProvider = ({ showModelOptions, isPopup }: TogetherProviderProps) => {
	const { apiConfiguration } = useExtensionState()
	const { handleFieldChange } = useApiConfigurationHandlers()
	const { t } = useTranslation()
	return (
		<div>
			<ApiKeyField
				initialValue={apiConfiguration?.togetherApiKey || ""}
				onChange={(value) => handleFieldChange("togetherApiKey", value)}
				providerName="Together"
			/>
			<DebouncedTextField
				initialValue={apiConfiguration?.togetherModelId || ""}
				onChange={(value) => handleFieldChange("togetherModelId", value)}
				style={{ width: "100%" }}
				placeholder={t("settings.api.enterModelId")}>
				<span style={{ fontWeight: 500 }}>{t("settings.api.modelId")}</span>
			</DebouncedTextField>
			<p
				style={{
					fontSize: "12px",
					marginTop: 3,
					color: "var(--vscode-descriptionForeground)",
				}}>
				<span style={{ color: "var(--vscode-errorForeground)" }}>({t("settings.api.complexPromptsNote")})</span>
			</p>
		</div>
	)
}
