import { ApiConfiguration } from "@shared/api"
import { VSCodeCheckbox, VSCodeDropdown, VSCodeOption, VSCodeLink } from "@vscode/webview-ui-toolkit/react"
import { DebouncedTextField } from "../common/DebouncedTextField"
import { DropdownContainer } from "../common/ModelSelector"
import { useState } from "react"
import { getOpenRouterAuthUrl } from "../utils/providerUtils"
import { useOpenRouterKeyInfo } from "../../ui/hooks/useOpenRouterKeyInfo"
import VSCodeButtonLink from "../../common/VSCodeButtonLink"
import OpenRouterModelPicker, { OPENROUTER_MODEL_PICKER_Z_INDEX } from "../OpenRouterModelPicker"
import { formatPrice } from "../utils/pricingUtils"
import { useExtensionState } from "@/context/ExtensionStateContext"
import { useApiConfigurationHandlers } from "../utils/useApiConfigurationHandlers"
import { useTranslation } from "react-i18next"
/**
 * Component to display OpenRouter balance information
 */
const OpenRouterBalanceDisplay = ({ apiKey }: { apiKey: string }) => {
	const { t } = useTranslation()
	const { data: keyInfo, isLoading, error } = useOpenRouterKeyInfo(apiKey)

	if (isLoading) {
		return <span style={{ fontSize: "12px", color: "var(--vscode-descriptionForeground)" }}>{t("settings.api.loading")}</span>
	}

	if (error || !keyInfo || keyInfo.limit === null) {
		// Don't show anything if there's an error, no info, or no limit set
		return null
	}

	// Calculate remaining balance
	const remainingBalance = keyInfo.limit - keyInfo.usage
	const formattedBalance = formatPrice(remainingBalance)

	return (
		<VSCodeLink
			href="https://openrouter.ai/settings/keys"
			title={`Remaining balance: ${formattedBalance}\nLimit: ${formatPrice(keyInfo.limit)}\nUsage: ${formatPrice(keyInfo.usage)}`}
			style={{
				fontSize: "12px",
				color: "var(--vscode-foreground)",
				textDecoration: "none",
				fontWeight: 500,
				paddingLeft: 4,
				cursor: "pointer",
			}}>
			{t("settings.api.balance")}: {formattedBalance}
		</VSCodeLink>
	)
}

/**
 * Props for the OpenRouterProvider component
 */
interface OpenRouterProviderProps {
	showModelOptions: boolean
	isPopup?: boolean
	uriScheme?: string
}

/**
 * The OpenRouter provider configuration component
 */
export const OpenRouterProvider = ({ showModelOptions, isPopup, uriScheme }: OpenRouterProviderProps) => {
	const { apiConfiguration } = useExtensionState()
	const { handleFieldChange } = useApiConfigurationHandlers()
	const { t } = useTranslation()

	const [providerSortingSelected, setProviderSortingSelected] = useState(!!apiConfiguration?.openRouterProviderSorting)

	return (
		<div>
			<div>
				<DebouncedTextField
					initialValue={apiConfiguration?.openRouterApiKey || ""}
					onChange={(value) => handleFieldChange("openRouterApiKey", value)}
					style={{ width: "100%" }}
					type="password"
					placeholder="Enter API Key...">
					<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
						<span style={{ fontWeight: 500 }}>OpenRouter {t("settings.api.apiKey")}</span>
						{apiConfiguration?.openRouterApiKey && (
							<OpenRouterBalanceDisplay apiKey={apiConfiguration.openRouterApiKey} />
						)}
					</div>
				</DebouncedTextField>
				{!apiConfiguration?.openRouterApiKey && (
					<VSCodeButtonLink
						href={getOpenRouterAuthUrl(uriScheme)}
						style={{ margin: "5px 0 0 0" }}
						appearance="secondary">
						{t("settings.api.getApiKey", { provider: "OpenRouter" })}
					</VSCodeButtonLink>
				)}
				<p
					style={{
						fontSize: "12px",
						marginTop: "5px",
						color: "var(--vscode-descriptionForeground)",
					}}>
					{t("settings.api.keyStoredLocally")}
				</p>
			</div>

			{showModelOptions && (
				<>
					<VSCodeCheckbox
						style={{ marginTop: -10 }}
						checked={providerSortingSelected}
						onChange={(e: any) => {
							const isChecked = e.target.checked === true
							setProviderSortingSelected(isChecked)
							if (!isChecked) {
								handleFieldChange("openRouterProviderSorting", "")
							}
						}}>
						{t("settings.api.sortProviderRouting")}
					</VSCodeCheckbox>

					{providerSortingSelected && (
						<div style={{ marginBottom: -6 }}>
							<DropdownContainer className="dropdown-container" zIndex={OPENROUTER_MODEL_PICKER_Z_INDEX + 1}>
								<VSCodeDropdown
									style={{ width: "100%", marginTop: 3 }}
									value={apiConfiguration?.openRouterProviderSorting}
									onChange={(e: any) => {
										handleFieldChange("openRouterProviderSorting", e.target.value)
									}}>
									<VSCodeOption value="">{t("settings.api.default")}</VSCodeOption>
									<VSCodeOption value="price">{t("settings.api.price")}</VSCodeOption>
									<VSCodeOption value="throughput">{t("settings.api.throughput")}</VSCodeOption>
									<VSCodeOption value="latency">{t("settings.api.latency")}</VSCodeOption>
								</VSCodeDropdown>
							</DropdownContainer>
							<p style={{ fontSize: "12px", marginTop: 3, color: "var(--vscode-descriptionForeground)" }}>
								{!apiConfiguration?.openRouterProviderSorting && t("settings.api.defaultBehaviorDesc")}
								{apiConfiguration?.openRouterProviderSorting === "price" && t("settings.api.priceProviderDesc")}
								{apiConfiguration?.openRouterProviderSorting === "throughput" &&
									t("settings.api.throughputProviderDesc")}
								{apiConfiguration?.openRouterProviderSorting === "latency" &&
									t("settings.api.latencyProviderDesc")}
							</p>
						</div>
					)}

					<OpenRouterModelPicker isPopup={isPopup} />
				</>
			)}
		</div>
	)
}
