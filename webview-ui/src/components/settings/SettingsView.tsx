import { ExtensionMessage } from "@shared/ExtensionMessage"
import { ResetStateRequest } from "@shared/proto/cline/state"
import { VSCodeButton } from "@vscode/webview-ui-toolkit/react"
import { CheckCheck, FlaskConical, Info, LucideIcon, Settings, SquareMousePointer, SquareTerminal, Webhook } from "lucide-react"
import { useCallback, useEffect, useRef, useState } from "react"
import { useEvent } from "react-use"
import HeroTooltip from "@/components/common/HeroTooltip"
import { useExtensionState } from "@/context/ExtensionStateContext"
import { StateServiceClient } from "@/services/grpc-client"
import { Tab, TabContent, TabHeader, TabList, TabTrigger } from "../common/Tab"
import SectionHeader from "./SectionHeader"
import AboutSection from "./sections/AboutSection"
import ApiConfigurationSection from "./sections/ApiConfigurationSection"
import BrowserSettingsSection from "./sections/BrowserSettingsSection"
import DebugSection from "./sections/DebugSection"
import FeatureSettingsSection from "./sections/FeatureSettingsSection"
import GeneralSettingsSection from "./sections/GeneralSettingsSection"
import TerminalSettingsSection from "./sections/TerminalSettingsSection"
import { useTranslation } from "react-i18next"

const IS_DEV = process.env.IS_DEV

// Styles for the tab system
const settingsTabsContainer = "flex flex-1 overflow-hidden [&.narrow_.tab-label]:hidden"
const settingsTabList =
	"w-48 data-[compact=true]:w-12 flex-shrink-0 flex flex-col overflow-y-auto overflow-x-hidden border-r border-[var(--vscode-sideBar-background)]"
const settingsTabTrigger =
	"whitespace-nowrap overflow-hidden min-w-0 h-12 px-4 py-3 box-border flex items-center border-l-2 border-transparent text-[var(--vscode-foreground)] opacity-70 bg-transparent hover:bg-[var(--vscode-list-hoverBackground)] data-[compact=true]:w-12 data-[compact=true]:p-4 cursor-pointer"
const settingsTabTriggerActive =
	"opacity-100 border-l-2 border-l-[var(--vscode-focusBorder)] border-t-0 border-r-0 border-b-0 bg-[var(--vscode-list-activeSelectionBackground)]"

// Tab definitions
interface SettingsTab {
	id: string
	name: string
	tooltipText: string
	headerText: string
	icon: LucideIcon
}

export const SETTINGS_TABS: SettingsTab[] = [
	{
		id: "api-config",
		name: "settings.tabs.apiConfig.name",
		tooltipText: "settings.tabs.apiConfig.tooltip",
		headerText: "settings.tabs.apiConfig.header",
		icon: Webhook,
	},
	{
		id: "general",
		name: "settings.tabs.general.name",
		tooltipText: "settings.tabs.general.tooltip",
		headerText: "settings.tabs.general.header",
		icon: Settings,
	},
	{
		id: "features",
		name: "settings.tabs.features.name",
		tooltipText: "settings.tabs.features.tooltip",
		headerText: "settings.tabs.features.header",
		icon: CheckCheck,
	},
	{
		id: "browser",
		name: "settings.tabs.browser.name",
		tooltipText: "settings.tabs.browser.tooltip",
		headerText: "settings.tabs.browser.header",
		icon: SquareMousePointer,
	},
	{
		id: "terminal",
		name: "settings.tabs.terminal.name",
		tooltipText: "settings.tabs.terminal.tooltip",
		headerText: "settings.tabs.terminal.header",
		icon: SquareTerminal,
	},
	// Only show in dev mode
	...(IS_DEV
		? [
				{
					id: "debug",
					name: "settings.tabs.debug.name",
					tooltipText: "settings.tabs.debug.tooltip",
					headerText: "settings.tabs.debug.header",
					icon: FlaskConical,
				},
			]
		: []),
	{
		id: "about",
		name: "settings.tabs.about.name",
		tooltipText: "settings.tabs.about.tooltip",
		headerText: "settings.tabs.about.header",
		icon: Info,
	},
]

type SettingsViewProps = {
	onDone: () => void
	targetSection?: string
}

const SettingsView = ({ onDone, targetSection }: SettingsViewProps) => {
	const { t, i18n } = useTranslation()
	// Track active tab
	const [activeTab, setActiveTab] = useState<string>(targetSection || SETTINGS_TABS[0].id)
	// Track if we're currently switching modes

	const { version } = useExtensionState()

	const handleMessage = useCallback((event: MessageEvent) => {
		const message: ExtensionMessage = event.data
		switch (message.type) {
			// Handle tab navigation through targetSection prop instead
			case "grpc_response":
				if (message.grpc_response?.message?.key === "scrollToSettings") {
					const tabId = message.grpc_response?.message?.value
					if (tabId) {
						console.log("Opening settings tab from GRPC response:", tabId)
						// Check if the value corresponds to a valid tab ID
						const isValidTabId = SETTINGS_TABS.some((tab) => tab.id === tabId)

						if (isValidTabId) {
							// Set the active tab directly
							setActiveTab(tabId)
						} else {
							// Fall back to the old behavior of scrolling to an element
							setTimeout(() => {
								const element = document.getElementById(tabId)
								if (element) {
									element.scrollIntoView({ behavior: "smooth" })

									element.style.transition = "background-color 0.5s ease"
									element.style.backgroundColor = "var(--vscode-textPreformat-background)"

									setTimeout(() => {
										element.style.backgroundColor = "transparent"
									}, 1200)
								}
							}, 300)
						}
					}
				}
				break
		}
	}, [])

	useEvent("message", handleMessage)

	const handleResetState = async (resetGlobalState?: boolean) => {
		try {
			await StateServiceClient.resetState(
				ResetStateRequest.create({
					global: resetGlobalState,
				}),
			)
		} catch (error) {
			console.error("Failed to reset state:", error)
		}
	}

	// Update active tab when targetSection changes
	useEffect(() => {
		if (targetSection) {
			setActiveTab(targetSection)
		}
	}, [targetSection])

	// Enhanced tab change handler with debugging
	const handleTabChange = useCallback(
		(tabId: string) => {
			console.log("Tab change requested:", tabId, "Current:", activeTab)
			setActiveTab(tabId)
		},
		[activeTab],
	)

	// Debug tab changes
	useEffect(() => {
		console.log("Active tab changed to:", activeTab)
	}, [activeTab])

	// Track whether we're in compact mode
	const [isCompactMode, setIsCompactMode] = useState(false)
	const containerRef = useRef<HTMLDivElement>(null)

	// Setup resize observer to detect when we should switch to compact mode
	useEffect(() => {
		if (!containerRef.current) {
			return
		}

		const observer = new ResizeObserver((entries) => {
			for (const entry of entries) {
				// If container width is less than 500px, switch to compact mode
				setIsCompactMode(entry.contentRect.width < 500)
			}
		})

		observer.observe(containerRef.current)

		return () => {
			observer?.disconnect()
		}
	}, [])

	return (
		<Tab>
			<TabHeader className="flex justify-between items-center gap-2">
				<div className="flex items-center gap-1">
					<h3 className="text-[var(--vscode-foreground)] m-0">{t("settings.title")}</h3>
				</div>
				<div className="flex gap-2">
					{/* All settings now save immediately, so only show Done button */}
					<VSCodeButton onClick={onDone}>{t("settings.done")}</VSCodeButton>
				</div>
			</TabHeader>

			{/* Vertical tabs layout */}
			<div className={`${settingsTabsContainer} ${isCompactMode ? "narrow" : ""}`} ref={containerRef}>
				{/* Tab sidebar */}
				<TabList
					className={settingsTabList}
					data-compact={isCompactMode}
					onValueChange={handleTabChange}
					value={activeTab}>
					{SETTINGS_TABS.map((tab) =>
						isCompactMode ? (
							<HeroTooltip key={tab.id} content={t(tab.tooltipText)} placement="right">
								<div
									className={`${
										activeTab === tab.id
											? `${settingsTabTrigger} ${settingsTabTriggerActive}`
											: settingsTabTrigger
									} focus:ring-0`}
									data-compact={isCompactMode}
									data-testid={`tab-${tab.id}`}
									data-value={tab.id}
									onClick={() => {
										console.log("Compact tab clicked:", tab.id)
										handleTabChange(tab.id)
									}}>
									<div className={`flex items-center gap-2 ${isCompactMode ? "justify-center" : ""}`}>
										<tab.icon className="w-4 h-4" />
										<span className="tab-label">{t(tab.name)}</span>
									</div>
								</div>
							</HeroTooltip>
						) : (
							<TabTrigger
								className={`${
									activeTab === tab.id
										? `${settingsTabTrigger} ${settingsTabTriggerActive}`
										: settingsTabTrigger
								} focus:ring-0`}
								data-compact={isCompactMode}
								data-testid={`tab-${tab.id}`}
								key={tab.id}
								value={tab.id}>
								<div className={`flex items-center gap-2 ${isCompactMode ? "justify-center" : ""}`}>
									<tab.icon className="w-4 h-4" />
									<span className="tab-label">{t(tab.name)}</span>
								</div>
							</TabTrigger>
						),
					)}
				</TabList>

				{/* Helper function to render section header */}
				{(() => {
					const renderSectionHeader = (tabId: string) => {
						const tab = SETTINGS_TABS.find((t) => t.id === tabId)
						if (!tab) {
							return null
						}

						return (
							<SectionHeader>
								<div className="flex items-center gap-2">
									{(() => {
										const Icon = tab.icon
										return <Icon className="w-4" />
									})()}
									<div>{t(tab.headerText)}</div>
								</div>
							</SectionHeader>
						)
					}

					return (
						<TabContent className="flex-1 overflow-auto">
							{/* API Configuration Tab */}
							{activeTab === "api-config" && <ApiConfigurationSection renderSectionHeader={renderSectionHeader} />}

							{/* General Settings Tab */}
							{activeTab === "general" && <GeneralSettingsSection renderSectionHeader={renderSectionHeader} />}

							{/* Feature Settings Tab */}
							{activeTab === "features" && <FeatureSettingsSection renderSectionHeader={renderSectionHeader} />}

							{/* Browser Settings Tab */}
							{activeTab === "browser" && <BrowserSettingsSection renderSectionHeader={renderSectionHeader} />}

							{/* Terminal Settings Tab */}
							{activeTab === "terminal" && <TerminalSettingsSection renderSectionHeader={renderSectionHeader} />}

							{/* Debug Tab (only in dev mode) */}
							{IS_DEV && activeTab === "debug" && (
								<DebugSection onResetState={handleResetState} renderSectionHeader={renderSectionHeader} />
							)}

							{/* About Tab */}
							{activeTab === "about" && (
								<AboutSection renderSectionHeader={renderSectionHeader} version={version} />
							)}
						</TabContent>
					)
				})()}
			</div>
		</Tab>
	)
}

export default SettingsView
