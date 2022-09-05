import { createHistoryEvent, reportTracker } from '@/utils'

import type { IOptions, IReportData } from '@/types'

export const routeTracker = (options: IOptions) => {
	const { routeMode, platform, elementOrSelector } = options

	let instance: any

	let originUrl = document.URL
	let enterTime = new Date().getTime()

	const captureEvents = (eventNames: string[], type: IReportData['type']) => {
		eventNames.forEach((eventName) => {
			window.addEventListener(eventName, async (event) => {
				const targetUrl = document.URL
				const leaveTime = new Date().getTime()

				const routeInfo = {
					originUrl,
					targetUrl,
					enterTime,
					leaveTime,
					stayTime: leaveTime - enterTime
				}

				switch (platform) {
					case 'vue':
						if (!instance) {
							if (typeof elementOrSelector === 'string') {
								instance = (document.querySelector(elementOrSelector) as any)?.__vue__
							}

							if (elementOrSelector instanceof Element) {
								instance = (elementOrSelector as any).__vue__
							}
						}

						await new Promise((resolve) => setTimeout(resolve, 300))

						Object.assign(routeInfo, instance.$route ?? {})
						break
					case 'react':
						// TODO: React路由劫持需补充
						break
				}

				reportTracker(options, {
					type,
					eventName,
					routeInfo
				})

				originUrl = targetUrl
				enterTime = leaveTime
			})
		})
	}

	if (routeMode) {
		window.history['pushState'] = createHistoryEvent('pushState')
		window.history['replaceState'] = createHistoryEvent('replaceState')

		switch (routeMode) {
			case 'history':
				captureEvents(['pushState', 'replaceState', 'popstate'], 'ROUTE_CHANGE')
				break
			case 'hash':
				captureEvents(['hashchange'], 'ROUTE_CHANGE')
				break
		}
	}
}
