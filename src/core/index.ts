import { routeTracker } from '@/tracker/routeTracker'
import { errorTracker, vueErrorTracker } from '@/tracker/errorTracker'
import { networkTracker } from '@/tracker/networkTracker'
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

	public init() {
		const { isLocationInfo, isRouteTracker, isErrorTracker, isNetworkTracker } = this.options

		if (isLocationInfo) {
			createLocationScript()
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
	}

	private createDefaultOptions() {
		return {
			routeMode: 'history',
			isLocationInfo: false,
			isRouteTracker: false,
			isErrorTracker: false,
			isNetworkTracker: false
		}
	}
}

export default BuriedPointTracker
