export interface IOptions {
	requestUrl: string
	routeMode: 'history' | 'hash'
	platform?: 'vue' | 'react'
	elementOrSelector?: Element | string
	isLocationInfo?: boolean
	isRouteTracker?: boolean
	isErrorTracker?: boolean
	userId?: string
	customParams?: Record<string, any>
}

export interface IReportData {
	type: 'ROUTE_CHANGE' | 'RUNTIME_ERROR' | 'PROMISE_ERROR' | 'VUE_ERROR'

	[key: string]: any
}

declare global {
	interface Window {
		returnCitySN: {
			cip: string
			cid: string
			cname: string
		}
	}
}
