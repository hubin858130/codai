import React from "react"
import TelemetryBanner from "@/components/common/TelemetryBanner"
import Announcement from "@/components/chat/Announcement"
import HomeHeader from "@/components/welcome/HomeHeader"
import HistoryPreview from "@/components/history/HistoryPreview"
import { SuggestedTasks } from "@/components/welcome/SuggestedTasks"
import AutoApproveBar from "@/components/chat/auto-approve-menu/AutoApproveBar"
import { WelcomeSectionProps } from "../../types/chatTypes"
import CodaiLogoVariable from "@/assets/CodaiLogoVariable"
import { t } from "i18next"

/**
 * Welcome section shown when there's no active task
 * Includes telemetry banner, announcements, home header, and history preview
 */
export const WelcomeSection: React.FC<WelcomeSectionProps> = ({
	showAnnouncement,
	hideAnnouncement,
	showHistoryView,
	telemetrySetting,
	version,
	taskHistory,
	shouldShowQuickWins,
}) => {
	return (
		<>
			<div
				style={{
					flex: "1 1 0",
					minHeight: 0,
					overflowY: "auto",
					display: "flex",
					flexDirection: "column",
					paddingBottom: "10px",
				}}>
				{/* {telemetrySetting === "unset" && <TelemetryBanner />}
				{showAnnouncement && <Announcement version={version} hideAnnouncement={hideAnnouncement} />}
				<HomeHeader /> */}
				<div style={{ padding: "0 20px", flexShrink: 0, textAlign: "center" }}>
						<h2>{t("chat.welcome.title")}</h2>
						<div className="my-5">
							<CodaiLogoVariable className="size-16" />
						</div>
					</div>
				{!shouldShowQuickWins && taskHistory.length > 0 && <HistoryPreview showHistoryView={showHistoryView} />}
			</div>
			<SuggestedTasks shouldShowQuickWins={shouldShowQuickWins} />
			<AutoApproveBar />
		</>
	)
}
