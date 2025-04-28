import { useCallback, useRef, useState } from "react"
import { vscode } from "@/utils/vscode"
import { VSCodeButton, VSCodeLink, VSCodeTextField } from "@vscode/webview-ui-toolkit/react"
import { useEvent } from "react-use"
import { LINKS } from "@/constants"
import { useTranslation } from "react-i18next"

const AddRemoteServerForm = ({ onServerAdded }: { onServerAdded: () => void }) => {
	const { t } = useTranslation()
	const [serverName, setServerName] = useState("")
	const [serverUrl, setServerUrl] = useState("")
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [error, setError] = useState("")
	const [showConnectingMessage, setShowConnectingMessage] = useState(false)

	// Store submitted values to check if the server was added
	const submittedValues = useRef<{ name: string } | null>(null)

	const handleMessage = useCallback(
		(event: MessageEvent) => {
			const message = event.data

			if (
				message.type === "addRemoteServerResult" &&
				isSubmitting &&
				submittedValues.current &&
				message.addRemoteServerResult?.serverName === submittedValues.current.name
			) {
				if (message.addRemoteServerResult.success) {
					// Handle success
					setIsSubmitting(false)
					setServerName("")
					setServerUrl("")
					submittedValues.current = null
					onServerAdded()
					setShowConnectingMessage(false)
				} else {
					// Handle error
					setIsSubmitting(false)
					setError(message.addRemoteServerResult.error || t("mcp.addServer.errors.failedToAdd"))
					setShowConnectingMessage(false)
				}
			}
		},
		[isSubmitting, onServerAdded, t],
	)

	useEvent("message", handleMessage)

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		if (!serverName.trim()) {
			setError(t("mcp.addServer.errors.nameRequired"))
			return
		}

		if (!serverUrl.trim()) {
			setError(t("mcp.addServer.errors.urlRequired"))
			return
		}

		try {
			new URL(serverUrl)
		} catch (err) {
			setError(t("mcp.addServer.errors.invalidUrl"))
			return
		}

		setError("")

		submittedValues.current = { name: serverName.trim() }

		setIsSubmitting(true)
		setShowConnectingMessage(true)
		vscode.postMessage({
			type: "addRemoteServer",
			serverName: serverName.trim(),
			serverUrl: serverUrl.trim(),
		})
	}

	return (
		<div className="p-4 px-5">
			<div className="text-[var(--vscode-foreground)] mb-2">
				{t("mcp.addServer.title")}{" "}
				<VSCodeLink href={LINKS.DOCUMENTATION.REMOTE_MCP_SERVER_DOCS} style={{ display: "inline" }}>
					{t("mcp.addServer.here")}
				</VSCodeLink>
			</div>

			<form onSubmit={handleSubmit}>
				<div className="mb-2">
					<VSCodeTextField
						value={serverName}
						onChange={(e) => {
							setServerName((e.target as HTMLInputElement).value)
							setError("")
						}}
						disabled={isSubmitting}
						className="w-full"
						placeholder={t("mcp.addServer.serverNamePlaceholder")}>
						{t("mcp.addServer.serverName")}
					</VSCodeTextField>
				</div>

				<div className="mb-2">
					<VSCodeTextField
						value={serverUrl}
						onChange={(e) => {
							setServerUrl((e.target as HTMLInputElement).value)
							setError("")
						}}
						disabled={isSubmitting}
						placeholder={t("mcp.addServer.serverUrlPlaceholder")}
						className="w-full mr-4">
						{t("mcp.addServer.serverUrl")}
					</VSCodeTextField>
				</div>

				{error && <div className="mb-3 text-[var(--vscode-errorForeground)]">{error}</div>}

				<div className="flex items-center mt-3 w-full">
					<VSCodeButton type="submit" disabled={isSubmitting} className="w-full">
						{isSubmitting ? t("mcp.addServer.addingButton") : t("mcp.addServer.addButton")}
					</VSCodeButton>

					{showConnectingMessage && (
						<div className="ml-3 text-[var(--vscode-notificationsInfoIcon-foreground)] text-sm">
							{t("mcp.addServer.connectingMessage")}
						</div>
					)}
				</div>

				<VSCodeButton
					appearance="secondary"
					style={{ width: "100%", marginBottom: "5px", marginTop: 15 }}
					onClick={() => {
						vscode.postMessage({ type: "openMcpSettings" })
					}}>
					{t("mcp.addServer.editConfig")}
				</VSCodeButton>
			</form>
		</div>
	)
}

export default AddRemoteServerForm
