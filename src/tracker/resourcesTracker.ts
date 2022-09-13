import { reportTracker } from '@/utils'

import type { IOptions } from '@/types'

export const resourcesTracker = (options: IOptions) => {
	const handleEntriesReport = (list: PerformanceEntryList) => {
		list
			.filter((entry: any) => entry.initiatorType !== 'xmlhttprequest')
			.forEach((entry: any) => {
				reportTracker(options, {
					type: 'RESOURCE_INFO',
					resourceInfo: {
						url: entry.name,
						type: entry.initiatorType,
						status: entry.transferSize === 0 ? 'fail' : 'succeed',
						duration: entry.duration
					}
				})
			})
	}

	handleEntriesReport(performance.getEntriesByType('resource'))

	const observer = new PerformanceObserver((list) => {
		handleEntriesReport(list.getEntriesByType('resource'))
	})

	observer.observe({ entryTypes: ['resource'] })
}
