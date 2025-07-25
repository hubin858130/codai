import {
	VSCodeButton,
	VSCodeDivider,
	VSCodeLink,
	VSCodeDropdown,
	VSCodeOption,
	VSCodeTag,
} from "@vscode/webview-ui-toolkit/react"
import { memo, useCallback, useEffect, useState, useRef } from "react"
import { useClineAuth } from "@/context/ClineAuthContext"
import VSCodeButtonLink from "../common/VSCodeButtonLink"
import ClineLogoWhite from "../../assets/ClineLogoWhite"
import CreditsHistoryTable from "./CreditsHistoryTable"
import { UsageTransaction, PaymentTransaction } from "@shared/ClineAccount"
import { useExtensionState } from "@/context/ExtensionStateContext"
import { AccountServiceClient } from "@/services/grpc-client"
import { EmptyRequest } from "@shared/proto/common"
import { useTranslation } from "react-i18next"

type AccountViewProps = {
	onDone: () => void
}

const AccountView = ({ onDone }: AccountViewProps) => {
	const { t } = useTranslation()

	return (
		<div className="fixed inset-0 flex flex-col overflow-hidden pt-[10px] pl-[20px]">
			<div className="flex justify-between items-center mb-[17px] pr-[17px]">
				<h3 className="text-[var(--vscode-foreground)] m-0">{t("account.title")}</h3>
				<VSCodeButton onClick={onDone}>{t("account.done")}</VSCodeButton>
			</div>
			<div className="flex-grow overflow-hidden pr-[8px] flex flex-col items-center justify-center">
				<p className="text-[var(--vscode-descriptionForeground)]">{t("account.underConstruction")}</p>
			</div>
		</div>
	)
}

export default memo(AccountView)
