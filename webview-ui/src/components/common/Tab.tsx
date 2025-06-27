import React, { HTMLAttributes, useCallback, forwardRef } from "react"

import { useExtensionState } from "@/context/ExtensionStateContext"
<<<<<<< HEAD
=======
import { cn } from "@/utils/cn"
>>>>>>> 16bc1c863785d2e3350bd9c2baa4bc31be43087d

type TabProps = HTMLAttributes<HTMLDivElement>

export const Tab = ({ className, children, ...props }: TabProps) => (
<<<<<<< HEAD
	<div className={`fixed inset-0 flex flex-col ${className}`} {...props}>
=======
	<div className={cn("fixed inset-0 flex flex-col", className)} {...props}>
>>>>>>> 16bc1c863785d2e3350bd9c2baa4bc31be43087d
		{children}
	</div>
)

export const TabHeader = ({ className, children, ...props }: TabProps) => (
<<<<<<< HEAD
	<div className={`px-5 py-2.5 border-b border-[var(--vscode-panel-border)] ${className}`} {...props}>
=======
	<div className={cn("px-5 py-2.5 border-b border-[var(--vscode-panel-border)]", className)} {...props}>
>>>>>>> 16bc1c863785d2e3350bd9c2baa4bc31be43087d
		{children}
	</div>
)

export const TabContent = ({ className, children, ...props }: TabProps) => {
	const onWheel = useCallback((e: React.WheelEvent<HTMLDivElement>) => {
		const target = e.target as HTMLElement

		// Prevent scrolling if the target is a listbox or option
		// (e.g. selects, dropdowns, etc).
		if (target.role === "listbox" || target.role === "option") {
			return
		}

		e.currentTarget.scrollTop += e.deltaY
	}, [])

	return (
<<<<<<< HEAD
		<div className={`flex-1 overflow-auto ${className}`} onWheel={onWheel} {...props}>
=======
		<div className={cn("flex-1 overflow-auto", className)} onWheel={onWheel} {...props}>
>>>>>>> 16bc1c863785d2e3350bd9c2baa4bc31be43087d
			{children}
		</div>
	)
}

export const TabList = forwardRef<
	HTMLDivElement,
	HTMLAttributes<HTMLDivElement> & {
		value: string
		onValueChange: (value: string) => void
	}
>(({ children, className, value, onValueChange, ...props }, ref) => {
	const handleTabSelect = useCallback(
		(tabValue: string) => {
			console.log("Tab selected:", tabValue)
			onValueChange(tabValue)
		},
		[onValueChange],
	)

	return (
<<<<<<< HEAD
		<div ref={ref} role="tablist" className={`flex ${className}`} {...props}>
=======
		<div ref={ref} role="tablist" className={cn("flex", className)} {...props}>
>>>>>>> 16bc1c863785d2e3350bd9c2baa4bc31be43087d
			{React.Children.map(children, (child) => {
				if (React.isValidElement(child)) {
					// Make sure we're passing the correct props to the TabTrigger
					return React.cloneElement(child as React.ReactElement<any>, {
						isSelected: child.props.value === value,
						onSelect: () => handleTabSelect(child.props.value),
					})
				}
				return child
			})}
		</div>
	)
})

export const TabTrigger = forwardRef<
	HTMLButtonElement,
	React.ButtonHTMLAttributes<HTMLButtonElement> & {
		value: string
		isSelected?: boolean
		onSelect?: () => void
	}
>(({ children, className, value, isSelected, onSelect, ...props }, ref) => {
	// Ensure we're using the value prop correctly
	return (
		<button
			ref={ref}
			role="tab"
			aria-selected={isSelected}
			tabIndex={isSelected ? 0 : -1}
<<<<<<< HEAD
			className={`focus:outline-none ${className}`}
=======
			className={cn("focus:outline-none", className)}
>>>>>>> 16bc1c863785d2e3350bd9c2baa4bc31be43087d
			onClick={onSelect}
			data-value={value} // Add data-value attribute for debugging
			{...props}>
			{children}
		</button>
	)
})
