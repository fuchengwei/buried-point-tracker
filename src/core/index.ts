import { routeTracker } from '@/tracker/routeTracker'
import { errorTracker, vueErrorTracker } from '@/tracker/errorTracker'
import { networkTracker } from '@/tracker/networkTracker'
import { resourcesTracker } from '@/tracker/resourcesTracker'
import { createLocationScript } from '@/utils/location'

import type { IOptions } from '@/types'

class BuriedPointTracker {
	private readonly options: IOptions

	constructor(options: IOptions) {
		this.options = Object.assign(this.createDefaultOptions(), options)
	}

	public setUserId(userId: IOptions['userId']) {
		this.options.userId = userId
		return this
	}

	public setCustomParams(customParams: IOptions['customParams']) {
		this.options.customParams = customParams
		return this
	}

	public setVueErrorTracker(vue: any) {
		vueErrorTracker(vue, this.options)
		return this
	}

	public async init() {
		const { isLocationInfo, isRouteTracker, isErrorTracker, isNetworkTracker, isResourcesTracker } = this.options

		if (isLocationInfo) {
			await createLocationScript()
		}

		if (isRouteTracker) {
			routeTracker(this.options)
		}

		if (isErrorTracker) {
			errorTracker(this.options)
		}

		if (isNetworkTracker) {
			networkTracker(this.options)
		}

		if (isResourcesTracker) {
			resourcesTracker(this.options)
		}
	}

	private createDefaultOptions() {
		return {
			routeMode: 'history',
			isLocationInfo: false,
			isRouteTracker: false,
			isErrorTracker: false,
			isNetworkTracker: false,
			networkTrackerConfig: {
				isFullReport: false
			},
			isResourcesTracker: false
		}
	}
}

export default BuriedPointTracker
