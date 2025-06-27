import { HTMLAttributes } from "react"
<<<<<<< HEAD
=======
import { cn } from "@/utils/cn"
>>>>>>> 16bc1c863785d2e3350bd9c2baa4bc31be43087d

import { OPENROUTER_MODEL_PICKER_Z_INDEX } from "./OpenRouterModelPicker"

type SectionHeaderProps = HTMLAttributes<HTMLDivElement> & {
	children: React.ReactNode
	description?: string
}

export const SectionHeader = ({ description, children, className, ...props }: SectionHeaderProps) => {
	return (
		<div
<<<<<<< HEAD
			className={`sticky top-0 text-[var(--vscode-foreground)] bg-[var(--vscode-panel-background)] px-5 py-3 ${className || ""}`}
=======
			className={cn(
				`sticky top-0 text-[var(--vscode-foreground)] bg-[var(--vscode-panel-background)] px-5 py-3`,
				className,
			)}
>>>>>>> 16bc1c863785d2e3350bd9c2baa4bc31be43087d
			{...props}
			style={{ zIndex: OPENROUTER_MODEL_PICKER_Z_INDEX + 20 }}>
			<h4 className="m-0">{children}</h4>
			{description && <p className="text-[var(--vscode-descriptionForeground)] text-sm mt-2 mb-0">{description}</p>}
		</div>
	)
}

export default SectionHeader
