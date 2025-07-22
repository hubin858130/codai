import { VSCodeButton, VSCodeLink } from "@vscode/webview-ui-toolkit/react"
import { useState, memo } from "react"
import ApiOptions from "@/components/settings/ApiOptions"
import ClineLogoWhite from "@/assets/ClineLogoWhite"
import { AccountServiceClient } from "@/services/grpc-client"
import { EmptyRequest } from "@shared/proto/common"
import { useTranslation, Trans } from "react-i18next"

const WelcomeView = memo(() => {
	const [showApiOptions, setShowApiOptions] = useState(false)
	const { t } = useTranslation()

	const handleLogin = () => {
		AccountServiceClient.accountLoginClicked(EmptyRequest.create()).catch((err) =>
			console.error("Failed to get login URL:", err),
		)
	}

	return (
		<div className="fixed inset-0 p-0 flex flex-col">
			<div className="h-full px-5 overflow-auto">
				<h2>{t("chat.welcome.title")}</h2>
				<div className="flex justify-center my-5">{/* <ClineLogoWhite className="size-16" /> */}</div>
				<p>
					<Trans
						i18nKey="chat.welcome.description"
						components={{
							claudeLink: (
								<VSCodeLink href="https://www.anthropic.com/claude/sonnet" className="inline">
									{t("chat.welcome.claudeLinkText")}
								</VSCodeLink>
							),
						}}
						values={{
							claudeLink: t("chat.welcome.claudeLinkText"),
						}}
					/>
				</p>

				{/* <p className="text-[var(--vscode-descriptionForeground)]">{t("chat.welcome.signupText")}</p>

				<VSCodeButton appearance="primary" onClick={handleLogin} className="w-full mt-1">
					{t('chat.welcome.getStarted')}
				</VSCodeButton> */}

				{!showApiOptions && (
					<VSCodeButton
						appearance="secondary"
						onClick={() => setShowApiOptions(!showApiOptions)}
						className="mt-2.5 w-full">
						{t("chat.welcome.useOwnApiKey")}
					</VSCodeButton>
				)}

				<div className="mt-4.5">{showApiOptions && <ApiOptions showModelOptions={false} showSubmitButton={true} />}</div>
			</div>
		</div>
	)
})

export default WelcomeView
