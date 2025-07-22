import { VSCodeCheckbox, VSCodeDropdown, VSCodeOption, VSCodeTextField } from "@vscode/webview-ui-toolkit/react"
import { TabButton } from "../../mcp/configuration/McpConfigurationView"
import ApiOptions from "../ApiOptions"
import Section from "../Section"
import { useExtensionState } from "@/context/ExtensionStateContext"
import { StateServiceClient } from "@/services/grpc-client"
import { UpdateSettingsRequest } from "@shared/proto/state"
import { useTranslation } from "react-i18next"
import { vscode } from "@/utils/vscode"
import { useEffect, useState } from "react"

interface ApiConfigurationSectionProps {
	isSwitchingMode: boolean
	handlePlanActModeChange: (mode: "plan" | "act") => Promise<void>
	renderSectionHeader: (tabId: string) => JSX.Element | null
}

const ApiConfigurationSection = ({
	isSwitchingMode,
	handlePlanActModeChange,
	renderSectionHeader,
}: ApiConfigurationSectionProps) => {
	const { t, i18n } = useTranslation()
	const { planActSeparateModelsSetting, chatSettings } = useExtensionState()
	const [autocompleteConfig, setAutocompleteConfig] = useState({
		autocomplete: {
			provider: "openai",
			title: "autocomplete-coder",
			apiKey: "",
			model: "",
			apiBase: "",
			enable: false,
		},
	})
	const updateAutoComplete = () => {
		vscode.postMessage({
				type: "updateAutocompleteConfig",
				autocompleteConfig
			})
	}

	// 在现有代码中添加这个useEffect
	useEffect(() => {
		if (autocompleteConfig.autocomplete.apiBase || 
			autocompleteConfig.autocomplete.apiKey || 
			autocompleteConfig.autocomplete.model) {
			updateAutoComplete();
		}
	}, [autocompleteConfig]);

	useEffect(() => {
		// 请求初始配置
		vscode.postMessage({ type: "getAutocompleteConfig" })

		// 监听配置更新
		const listener = (event: MessageEvent) => {
			const message = event.data
			if (message.type === "autocompleteConfig") {
				setAutocompleteConfig(message.autocompleteConfig)
			}
		}

		window.addEventListener("message", listener)
		return () => window.removeEventListener("message", listener)
	}, [])
	
	return (
		<div>
			{renderSectionHeader("api-config")}
			<Section>
				{/* Tabs container */}
				{planActSeparateModelsSetting ? (
					<div className="rounded-md mb-5 bg-[var(--vscode-panel-background)]">
						<div className="flex gap-[1px] mb-[10px] -mt-2 border-0 border-b border-solid border-[var(--vscode-panel-border)]">
							<TabButton
								isActive={chatSettings.mode === "plan"}
								onClick={() => handlePlanActModeChange("plan")}
								disabled={isSwitchingMode}
								style={{
									opacity: isSwitchingMode ? 0.6 : 1,
									cursor: isSwitchingMode ? "not-allowed" : "pointer",
								}}>
								{isSwitchingMode && chatSettings.mode === "act" ? "Switching..." : t("settings.actMode")}
							</TabButton>
							<TabButton
								isActive={chatSettings.mode === "act"}
								onClick={() => handlePlanActModeChange("act")}
								disabled={isSwitchingMode}
								style={{
									opacity: isSwitchingMode ? 0.6 : 1,
									cursor: isSwitchingMode ? "not-allowed" : "pointer",
								}}>
								{isSwitchingMode && chatSettings.mode === "plan" ? "Switching..." : t("settings.actMode")}
							</TabButton>
						</div>

						{/* Content container */}
						<div className="-mb-3">
							<ApiOptions showModelOptions={true} />
						</div>
					</div>
				) : (
					<ApiOptions showModelOptions={true} />
				)}

				<div className="mb-[5px]">
					<VSCodeCheckbox
						className="mb-[5px]"
						checked={planActSeparateModelsSetting}
						onChange={async (e: any) => {
							const checked = e.target.checked === true
							try {
								await StateServiceClient.updateSettings(
									UpdateSettingsRequest.create({
										planActSeparateModelsSetting: checked,
									}),
								)
							} catch (error) {
								console.error("Failed to update separate models setting:", error)
							}
						}}>
						{t("settings.other.planActSeparateModels")}
					</VSCodeCheckbox>
					<p className="text-xs mt-[5px] text-[var(--vscode-descriptionForeground)]">
						{t("settings.other.planActSeparateModelsDesc")}
					</p>
				</div>
				{/* Autocomplete Settings Section */}
				<div className="border border-solid border-[var(--vscode-panel-border)] rounded-md p-[10px] mb-5 bg-[var(--vscode-panel-background)] [&_vscode-dropdown]:w-full [&_vscode-text-field]:w-full">
					<details
						onToggle={(e) => {
							if (e.currentTarget.open) {
								vscode.postMessage({ type: "getAutocompleteConfig" })
							}
						}}>
						<summary className="cursor-pointer font-medium">
							{t("settings.autocomplete.title")}
						</summary>
						<div className="mt-3 space-y-3">
							<VSCodeDropdown>
								<VSCodeOption value="openai">OpenAI Compatible</VSCodeOption>
							</VSCodeDropdown>

							<VSCodeTextField
								value={autocompleteConfig.autocomplete.apiBase}
								onInput={(e: any) => {
									// if (e.target.value !== autocompleteConfig.autocomplete.apiBase) {
									// 	setHasUnsavedChanges(true) //huqb
									// }
									setAutocompleteConfig({
										...autocompleteConfig,
										autocomplete: {
											...autocompleteConfig.autocomplete,
											apiBase: e.target.value,
										},
									})
								}}
								placeholder={t("settings.autocomplete.apiBase")}>
								{t("settings.autocomplete.apiBase")}
							</VSCodeTextField>

							<VSCodeTextField
								value={autocompleteConfig.autocomplete.apiKey}
								type="password"
								onInput={(e: any) => {
									// if (e.target.value !== autocompleteConfig.autocomplete.apiKey) {
									// 	setHasUnsavedChanges(true) //huqb
									// }
									setAutocompleteConfig({
										...autocompleteConfig,
										autocomplete: {
											...autocompleteConfig.autocomplete,
											apiKey: e.target.value,
										},
									})
								}}
								placeholder={t("settings.autocomplete.apiKey")}>
								{t("settings.autocomplete.apiKey")}
							</VSCodeTextField>

							<VSCodeTextField
								value={autocompleteConfig.autocomplete.model}
								onInput={(e: any) => {
									// if (e.target.value !== autocompleteConfig.autocomplete.model) {
									// 	setHasUnsavedChanges(true) //huqb
									// }
									setAutocompleteConfig({
										...autocompleteConfig,
										autocomplete: {
											...autocompleteConfig.autocomplete,
											model: e.target.value,
										},
									})
								}}
								placeholder={t("settings.autocomplete.model")}>
								{t("settings.autocomplete.model")}
							</VSCodeTextField>

							<VSCodeCheckbox
								checked={autocompleteConfig.autocomplete.enable}
								onChange={(e: any) => {
									// if (e.target.checked !== autocompleteConfig.autocomplete.enable) {
									// 	setHasUnsavedChanges(true) //huqb
									// }
									setAutocompleteConfig({
										...autocompleteConfig,
										autocomplete: {
											...autocompleteConfig.autocomplete,
											enable: e.target.checked,
										},
									})
								}}>
								{t("settings.autocomplete.enable")}
							</VSCodeCheckbox>
						</div>
					</details>
				</div>
			</Section>
		</div>
	)
}

export default ApiConfigurationSection
