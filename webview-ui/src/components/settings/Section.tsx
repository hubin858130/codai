import { HTMLAttributes } from "react"
<<<<<<< HEAD
=======
import { cn } from "@/utils/cn"
>>>>>>> 16bc1c863785d2e3350bd9c2baa4bc31be43087d

type SectionProps = HTMLAttributes<HTMLDivElement>

export const Section = ({ className, ...props }: SectionProps) => (
<<<<<<< HEAD
	<div className={`flex flex-col gap-3 p-5 py-2 ${className || ""}`} {...props} />
=======
	<div className={cn("flex flex-col gap-3 p-5 py-2", className)} {...props} />
>>>>>>> 16bc1c863785d2e3350bd9c2baa4bc31be43087d
)

export default Section
