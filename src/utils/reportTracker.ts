import { version } from '../../package.json'
import { getLocationInfo } from '@/utils/location'

import type { IOptions, IReportData } from '@/types'

export const reportTracker = (options: IOptions, data: IReportData) => {
	const { requestUrl, userId, customParams = {}, isLocationInfo } = options
	const { appCodeName, appName, appVersion, platform, userAgent } = navigator

	const params = Object.assign(
		customParams,
		data,
		{
			userId,
			sdkVersion: version,
			clientInfo: {
				appName,
				appCodeName,
				appVersion,
				platform,
				userAgent
			},
			time: new Date().getTime()
		},
		isLocationInfo && { locationInfo: getLocationInfo() }
	)

	let cache: any[] = []

	const blob = new Blob(
		[
			JSON.stringify(params, (_, value) => {
				if (typeof value === 'object' && value !== null) {
					if (cache.indexOf(value) !== -1) {
						return
					}
					cache.push(value)
				}
			})
		],
		{
			type: 'application/json; charset=UTF-8'
		}
	)

	console.log(params)
	// navigator.sendBeacon(requestUrl, blob)
}
