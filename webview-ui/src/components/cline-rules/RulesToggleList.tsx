import NewRuleRow from "./NewRuleRow"
import RuleRow from "./RuleRow"
import { useTranslation } from "react-i18next"

const RulesToggleList = ({
	rules,
	toggleRule,
	listGap = "medium",
	isGlobal,
	ruleType,
	showNewRule,
	showNoRules,
}: {
	rules: [string, boolean][]
	toggleRule: (rulePath: string, enabled: boolean) => void
	listGap?: "small" | "medium" | "large"
	isGlobal: boolean
	ruleType: string
	showNewRule: boolean
	showNoRules: boolean
}) => {
	const { t } = useTranslation()
	const gapClasses = {
		small: "gap-0",
		medium: "gap-2.5",
		large: "gap-5",
	}

	const gapClass = gapClasses[listGap]

	return (
		<div className={`flex flex-col ${gapClass}`}>
			{rules.length > 0 ? (
				<>
					{rules.map(([rulePath, enabled]) => (
						<RuleRow
							enabled={enabled}
							isGlobal={isGlobal}
							key={rulePath}
							rulePath={rulePath}
							ruleType={ruleType}
							toggleRule={toggleRule}
						/>
					))}
					{showNewRule && <NewRuleRow isGlobal={isGlobal} ruleType={ruleType} />}
				</>
			) : (
				<>
					{showNoRules && (
						<div className="flex flex-col items-center gap-3 my-3 text-[var(--vscode-descriptionForeground)]">
							{ruleType === "workflow" ? t("CodaiRules.noWorkflowsFound") : t("CodaiRules.noRulesFound")}
						</div>
					)}
					{showNewRule && <NewRuleRow isGlobal={isGlobal} ruleType={ruleType} />}
				</>
			)}
		</div>
	)
}

export default RulesToggleList
