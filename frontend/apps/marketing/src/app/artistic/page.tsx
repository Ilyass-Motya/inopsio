import { BackgroundPaths } from "@/components/ui/shadcn-io/background-paths"

export default function ArtisticLanding() {
	return (
		<div className="relative h-screen w-full">
			<BackgroundPaths 
				title="Creative Studio"
				colorClass="text-primary-600 dark:text-primary-400"
				titleFromClass="from-primary-800 dark:from-primary-200"
				titleToClass="to-primary-500/80 dark:to-primary-400/80"
			/>
		</div>
	)
}
