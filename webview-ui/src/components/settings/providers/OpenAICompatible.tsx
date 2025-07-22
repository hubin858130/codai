import { ApiConfiguration, azureOpenAiDefaultApiVersion, openAiModelInfoSaneDefaults } from "@shared/api"
import { OpenAiModelsRequest } from "@shared/proto/models"
import { ModelsServiceClient } from "@/services/grpc-client"
import { getAsVar, VSC_DESCRIPTION_FOREGROUND } from "@/utils/vscStyles"
import { VSCodeButton, VSCodeCheckbox, VSCodeRadio, VSCodeRadioGroup } from "@vscode/webview-ui-toolkit/react"
import { useCallback, useEffect, useRef, useState } from "react"
import { DebouncedTextField } from "../common/DebouncedTextField"
import { ModelInfoView } from "../common/ModelInfoView"
import { ApiKeyField } from "../common/ApiKeyField"
import { BaseUrlField } from "../common/BaseUrlField"
import { normalizeApiConfiguration } from "../utils/providerUtils"
import { useExtensionState } from "@/context/ExtensionStateContext"
import { useApiConfigurationHandlers } from "../utils/useApiConfigurationHandlers"
import { useTranslation } from "react-i18next"
import { StringArray } from "@shared/proto/common"

/**
 * Props for the OpenAICompatibleProvider component
 */
interface OpenAICompatibleProviderProps {
	showModelOptions: boolean
	isPopup?: boolean
}

/**
 * The OpenAI Compatible provider configuration component
 */
export const OpenAICompatibleProvider = ({ showModelOptions, isPopup }: OpenAICompatibleProviderProps) => {
	const { t } = useTranslation()
	const extensionState = useExtensionState()
	const { apiConfiguration } = useExtensionState()
	const { handleFieldChange } = useApiConfigurationHandlers()

	const [modelConfigurationSelected, setModelConfigurationSelected] = useState(false)

	// Get the normalized configuration
	const { selectedModelId, selectedModelInfo } = normalizeApiConfiguration(apiConfiguration)

	// Debounced function to refresh OpenAI models (prevents excessive API calls while typing)
	const debounceTimerRef = useRef<NodeJS.Timeout | null>(null)

	useEffect(() => {
		return () => {
			if (debounceTimerRef.current) {
				clearTimeout(debounceTimerRef.current)
			}
		}
	}, [])

	const debouncedRefreshOpenAiModels = useCallback(
		(baseUrl?: string, apiKey?: string) => {
			if (debounceTimerRef.current) {
				clearTimeout(debounceTimerRef.current)
			}
			console.log("@@@@ debouncedRefreshOpenAiModels:", baseUrl)
			if (baseUrl && apiKey) {
				debounceTimerRef.current = setTimeout(() => {
					ModelsServiceClient.refreshOpenAiModels(
						OpenAiModelsRequest.create({
							baseUrl,
							apiKey,
						}),
					)
						.then((response: StringArray) => {
							const models = response.values || []
							extensionState.setOpenAiModels(models)
							console.log("@@@@ models", models)
						})
						.catch((error) => {
							console.error("Failed to refresh OpenAI models:", error)
						})
				}, 500)
			}
		},
		[extensionState],
	)

	useEffect(() => {
		if (apiConfiguration?.apiProvider == "openai" && apiConfiguration.openAiBaseUrl) {
			debouncedRefreshOpenAiModels(apiConfiguration?.openAiBaseUrl, apiConfiguration?.openAiApiKey)
		}
	}, [])

	return (
		<div>
			<DebouncedTextField
				initialValue={apiConfiguration?.openAiBaseUrl || ""}
				onChange={(value) => {
					handleFieldChange("openAiBaseUrl", value)
					debouncedRefreshOpenAiModels(value, apiConfiguration?.openAiApiKey)
				}}
				style={{ width: "100%", marginBottom: 10 }}
				type="url"
				placeholder={t("settings.api.enterBaseUrl")}>
				<span style={{ fontWeight: 500 }}>{t("settings.api.baseUrl")}</span>
			</DebouncedTextField>

			<ApiKeyField
				initialValue={apiConfiguration?.openAiApiKey || ""}
				onChange={(value) => {
					handleFieldChange("openAiApiKey", value)
					debouncedRefreshOpenAiModels(apiConfiguration?.openAiBaseUrl, value)
				}}
				providerName="OpenAI Compatible"
			/>

			<DebouncedTextField
				initialValue={apiConfiguration?.openAiModelId || ""}
				onChange={(value) => handleFieldChange("openAiModelId", value)}
				style={{ width: "100%", marginBottom: 10 }}
				placeholder={t("settings.api.enterModelId")}>
				<span style={{ fontWeight: 500 }}>{t("settings.api.modelId")}</span>
			</DebouncedTextField>
			{extensionState.openAiModels.length > 0 && (
				<VSCodeRadioGroup
					value={
						extensionState.openAiModels.includes(apiConfiguration?.openAiModelId || "")
							? apiConfiguration?.openAiModelId
							: ""
					}
					onChange={(e) => {
						const value = (e.target as HTMLInputElement)?.value
						// need to check value first since radio group returns empty string sometimes
						if (value) {
							handleFieldChange("openAiModelId", value)
						}
					}}>
					{extensionState.openAiModels.map((model) => (
						<VSCodeRadio key={model} value={model} checked={apiConfiguration?.openAiModelId === model}>
							{model}
						</VSCodeRadio>
					))}
				</VSCodeRadioGroup>
			)}

			{/* OpenAI Compatible Custom Headers */}
			{(() => {
				const headerEntries = Object.entries(apiConfiguration?.openAiHeaders ?? {})
				return (
					<div style={{ marginBottom: 10 }}>
						<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
							<span style={{ fontWeight: 500 }}>{t("settings.api.customHeaders")}</span>
							<VSCodeButton
								onClick={() => {
									const currentHeaders = { ...(apiConfiguration?.openAiHeaders || {}) }
									const headerCount = Object.keys(currentHeaders).length
									const newKey = `header${headerCount + 1}`
									currentHeaders[newKey] = ""
									handleFieldChange("openAiHeaders", currentHeaders)
								}}>
								{t("settings.api.addHeader")}
							</VSCodeButton>
						</div>
						<div>
							{headerEntries.map(([key, value], index) => (
								<div key={index} style={{ display: "flex", gap: 5, marginTop: 5 }}>
									<DebouncedTextField
										initialValue={key}
										style={{ width: "40%" }}
										placeholder={t("settings.api.headerName")}
										onChange={(newValue) => {
											const currentHeaders = apiConfiguration?.openAiHeaders ?? {}
											if (newValue && newValue !== key) {
												const { [key]: _, ...rest } = currentHeaders
												handleFieldChange("openAiHeaders", {
													...rest,
													[newValue]: value,
												})
											}
										}}
									/>
									<DebouncedTextField
										initialValue={value}
										style={{ width: "40%" }}
										placeholder={t("settings.api.headerValue")}
										onChange={(newValue) => {
											handleFieldChange("openAiHeaders", {
												...(apiConfiguration?.openAiHeaders ?? {}),
												[key]: newValue,
											})
										}}
									/>
									<VSCodeButton
										appearance="secondary"
										onClick={() => {
											const { [key]: _, ...rest } = apiConfiguration?.openAiHeaders ?? {}
											handleFieldChange("openAiHeaders", rest)
										}}>
										{t("settings.api.remove")}
									</VSCodeButton>
								</div>
							))}
						</div>
					</div>
				)
			})()}

			<BaseUrlField
				initialValue={apiConfiguration?.azureApiVersion}
				onChange={(value) => handleFieldChange("azureApiVersion", value)}
				label="Set Azure API version"
				placeholder={`${t("settings.api.default")}: ${azureOpenAiDefaultApiVersion}`}
			/>

			<div
				style={{
					color: getAsVar(VSC_DESCRIPTION_FOREGROUND),
					display: "flex",
					margin: "10px 0",
					cursor: "pointer",
					alignItems: "center",
				}}
				onClick={() => setModelConfigurationSelected((val) => !val)}>
				<span
					className={`codicon ${modelConfigurationSelected ? "codicon-chevron-down" : "codicon-chevron-right"}`}
					style={{
						marginRight: "4px",
					}}></span>
				<span
					style={{
						fontWeight: 700,
						textTransform: "uppercase",
					}}>
					{t("settings.api.modelConfiguration")}
				</span>
			</div>

			{modelConfigurationSelected && (
				<>
					<VSCodeCheckbox
						checked={!!apiConfiguration?.openAiModelInfo?.supportsImages}
						onChange={(e: any) => {
							const isChecked = e.target.checked === true
							const modelInfo = apiConfiguration?.openAiModelInfo
								? apiConfiguration.openAiModelInfo
								: { ...openAiModelInfoSaneDefaults }
							modelInfo.supportsImages = isChecked
							handleFieldChange("openAiModelInfo", modelInfo)
						}}>
						{t("settings.api.supportsImages")}
					</VSCodeCheckbox>

					<VSCodeCheckbox
						checked={!!apiConfiguration?.openAiModelInfo?.supportsImages}
						onChange={(e: any) => {
							const isChecked = e.target.checked === true
							let modelInfo = apiConfiguration?.openAiModelInfo
								? apiConfiguration.openAiModelInfo
								: { ...openAiModelInfoSaneDefaults }
							modelInfo.supportsImages = isChecked
							handleFieldChange("openAiModelInfo", modelInfo)
						}}>
						{t("settings.api.supportsBrowserUse")}
					</VSCodeCheckbox>

					<VSCodeCheckbox
						checked={!!apiConfiguration?.openAiModelInfo?.isR1FormatRequired}
						onChange={(e: any) => {
							const isChecked = e.target.checked === true
							let modelInfo = apiConfiguration?.openAiModelInfo
								? apiConfiguration.openAiModelInfo
								: { ...openAiModelInfoSaneDefaults }
							modelInfo = { ...modelInfo, isR1FormatRequired: isChecked }

							handleFieldChange("openAiModelInfo", modelInfo)
						}}>
						{t("settings.api.enableR1Format")}
					</VSCodeCheckbox>

					<div style={{ display: "flex", gap: 10, marginTop: "5px" }}>
						<DebouncedTextField
							initialValue={
								apiConfiguration?.openAiModelInfo?.contextWindow
									? apiConfiguration.openAiModelInfo.contextWindow.toString()
									: (openAiModelInfoSaneDefaults.contextWindow?.toString() ?? "")
							}
							style={{ flex: 1 }}
							onChange={(value) => {
								const modelInfo = apiConfiguration?.openAiModelInfo
									? apiConfiguration.openAiModelInfo
									: { ...openAiModelInfoSaneDefaults }
								modelInfo.contextWindow = Number(value)
								handleFieldChange("openAiModelInfo", modelInfo)
							}}>
							<span style={{ fontWeight: 500 }}>{t("settings.api.contextWindowSize")}</span>
						</DebouncedTextField>

						<DebouncedTextField
							initialValue={
								apiConfiguration?.openAiModelInfo?.maxTokens
									? apiConfiguration.openAiModelInfo.maxTokens.toString()
									: (openAiModelInfoSaneDefaults.maxTokens?.toString() ?? "")
							}
							style={{ flex: 1 }}
							onChange={(value) => {
								const modelInfo = apiConfiguration?.openAiModelInfo
									? apiConfiguration.openAiModelInfo
									: { ...openAiModelInfoSaneDefaults }
								modelInfo.maxTokens = Number(value)
								handleFieldChange("openAiModelInfo", modelInfo)
							}}>
							<span style={{ fontWeight: 500 }}>{t("settings.api.maxOutputTokens")}</span>
						</DebouncedTextField>
					</div>

					<div style={{ display: "flex", gap: 10, marginTop: "5px" }}>
						<DebouncedTextField
							initialValue={
								apiConfiguration?.openAiModelInfo?.inputPrice
									? apiConfiguration.openAiModelInfo.inputPrice.toString()
									: (openAiModelInfoSaneDefaults.inputPrice?.toString() ?? "")
							}
							style={{ flex: 1 }}
							onChange={(value) => {
								const modelInfo = apiConfiguration?.openAiModelInfo
									? apiConfiguration.openAiModelInfo
									: { ...openAiModelInfoSaneDefaults }
								modelInfo.inputPrice = Number(value)
								handleFieldChange("openAiModelInfo", modelInfo)
							}}>
							<span style={{ fontWeight: 500 }}>{t("settings.api.inputPricePerMillion")}</span>
						</DebouncedTextField>

						<DebouncedTextField
							initialValue={
								apiConfiguration?.openAiModelInfo?.outputPrice
									? apiConfiguration.openAiModelInfo.outputPrice.toString()
									: (openAiModelInfoSaneDefaults.outputPrice?.toString() ?? "")
							}
							style={{ flex: 1 }}
							onChange={(value) => {
								const modelInfo = apiConfiguration?.openAiModelInfo
									? apiConfiguration.openAiModelInfo
									: { ...openAiModelInfoSaneDefaults }
								modelInfo.outputPrice = Number(value)
								handleFieldChange("openAiModelInfo", modelInfo)
							}}>
							<span style={{ fontWeight: 500 }}>{t("settings.api.outputPricePerMillion")}</span>
						</DebouncedTextField>
					</div>

					<div style={{ display: "flex", gap: 10, marginTop: "5px" }}>
						<DebouncedTextField
							initialValue={
								apiConfiguration?.openAiModelInfo?.temperature
									? apiConfiguration.openAiModelInfo.temperature.toString()
									: (openAiModelInfoSaneDefaults.temperature?.toString() ?? "")
							}
							onChange={(value) => {
								const modelInfo = apiConfiguration?.openAiModelInfo
									? apiConfiguration.openAiModelInfo
									: { ...openAiModelInfoSaneDefaults }

								const shouldPreserveFormat = value.endsWith(".") || (value.includes(".") && value.endsWith("0"))

								modelInfo.temperature =
									value === ""
										? openAiModelInfoSaneDefaults.temperature
										: shouldPreserveFormat
											? (value as any)
											: parseFloat(value)

								handleFieldChange("openAiModelInfo", modelInfo)
							}}>
							<span style={{ fontWeight: 500 }}>{t("settings.api.temperature")}</span>
						</DebouncedTextField>
					</div>
				</>
			)}

			<p
				style={{
					fontSize: "12px",
					marginTop: 3,
					color: "var(--vscode-descriptionForeground)",
				}}>
				<span style={{ color: "var(--vscode-errorForeground)" }}>({t("settings.api.complexPromptsNote")})</span>
			</p>

			{showModelOptions && (
				<ModelInfoView selectedModelId={selectedModelId} modelInfo={selectedModelInfo} isPopup={isPopup} />
			)}
		</div>
	)
}
