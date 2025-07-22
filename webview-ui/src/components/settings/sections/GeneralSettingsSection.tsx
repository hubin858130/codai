import { 
	VSCodeCheckbox, 
	VSCodeLink,
	VSCodeOption,
	VSCodeDropdown,
} from "@vscode/webview-ui-toolkit/react"
import { useExtensionState } from "@/context/ExtensionStateContext"
import { updateSetting } from "../utils/settingsHandlers"
import PreferredLanguageSetting from "../PreferredLanguageSetting"
import Section from "../Section"
import { useTranslation } from "react-i18next"
import { useEffect, useState } from "react"
import { vscode } from "@/utils/vscode"

interface GeneralSettingsSectionProps {
	renderSectionHeader: (tabId: string) => JSX.Element | null
}



const GeneralSettingsSection = ({ renderSectionHeader }: GeneralSettingsSectionProps) => {
	const { telemetrySetting } = useExtensionState()
	const { t, i18n } = useTranslation()
	const [currentLanguage, setCurrentLanguage] = useState<string>("en")
	useEffect(() => {
		// 获取当前语言设置
		vscode.postMessage({ type: "getLanguageConfig" })
	}, [])

	useEffect(() => {
		// 监听语言配置更新
		const listener = (event: MessageEvent) => {
			const message = event.data
			if (message.type === "languageConfig") {
				setCurrentLanguage(message.language)
				i18n.changeLanguage(message.language)
			}
		}

		window.addEventListener("message", listener)
		return () => window.removeEventListener("message", listener)
	}, [i18n])

	const handleLanguageChange = (e: any) => {
		const newLanguage = e.target.value
		setCurrentLanguage(newLanguage)
		vscode.postMessage({
			type: "updateLanguageConfig",
			language: newLanguage,
		})
	}


	return (
		<div>
			{renderSectionHeader("general")}
			<Section>
				{/* <PreferredLanguageSetting /> */}

				{/* <div className="mb-[5px]">
					<VSCodeCheckbox
						className="mb-[5px]"
						checked={telemetrySetting !== "disabled"}
						onChange={(e: any) => {
							const checked = e.target.checked === true
							updateSetting("telemetrySetting", checked ? "enabled" : "disabled")
						}}>
						Allow anonymous error and usage reporting
					</VSCodeCheckbox>
					<p className="text-xs mt-[5px] text-[var(--vscode-descriptionForeground)]">
						Help improve Cline by sending anonymous usage data and error reports. No code, prompts, or personal
						information are ever sent. See our{" "}
						<VSCodeLink href="https://docs.cline.bot/more-info/telemetry" className="text-inherit">
							telemetry overview
						</VSCodeLink>{" "}
						and{" "}
						<VSCodeLink href="https://cline.bot/privacy" className="text-inherit">
							privacy policy
						</VSCodeLink>{" "}
						for more details.
					</p>
				</div> */}
				{/* Language Selection */}
				<div className="border border-solid border-[var(--vscode-panel-border)] rounded-md p-[10px] mb-5 bg-[var(--vscode-panel-background)]">
					<details>
						<summary className="cursor-pointer font-medium">
							{t("settings.language.title")}
						</summary>
						<div className="mt-3">
							<VSCodeDropdown
								value={currentLanguage || "English"}
								onChange={handleLanguageChange}
								style={{ position: "relative", zIndex: 2000 }}>
								<VSCodeOption value="en">English</VSCodeOption>
								<VSCodeOption value="zh-CN">简体中文</VSCodeOption>
								<VSCodeOption value="ja">日本語</VSCodeOption>
								<VSCodeOption value="ru">Русский</VSCodeOption>
								<VSCodeOption value="fr">Français</VSCodeOption>
								<VSCodeOption value="ar">العربية</VSCodeOption>
								<VSCodeOption value="ko">한국어</VSCodeOption>
								<VSCodeOption value="zh-TW">繁體中文</VSCodeOption>
								<VSCodeOption value="de">Deutsch</VSCodeOption>
								<VSCodeOption value="it">Italiano</VSCodeOption>
								<VSCodeOption value="ms">Bahasa Melayu</VSCodeOption>
								<VSCodeOption value="es">Español</VSCodeOption>
							</VSCodeDropdown>
						</div>
					</details>
				</div>

			</Section>
		</div>
	)
}

export default GeneralSettingsSection
