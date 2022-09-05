import { reportTracker } from '@/utils'

import type { App } from 'vue'
import type { IOptions } from '@/types'

export const errorTracker = (options: IOptions) => {
	window.addEventListener('error', (errorEvent) => {
		reportTracker(options, {
			type: 'RUNTIME_ERROR',
			eventName: errorEvent.type,
			errorInfo: {
				type: errorEvent.error.name,
				message: errorEvent.error.message,
				stack: errorEvent.error.stack
			}
		})
	})

	window.addEventListener('unhandledrejection', (promiseRejectionEvent) => {
		reportTracker(options, {
			type: 'PROMISE_ERROR',
			eventName: promiseRejectionEvent.type,
			errorInfo: promiseRejectionEvent.reason
		})
	})
}

export const vueErrorTracker = (vue: App, options: IOptions) => {
	vue.config.errorHandler = (err: any, _, info) => {
		reportTracker(options, {
			type: 'VUE_ERROR',
			eventName: 'error',
			errorInfo: {
				type: err.name,
				message: err.message,
				stack: err.stack,
				handleFun: info
			}
		})
	}
}

export const reactErrorTracker = () => {
	// TODO: React错误劫持需补充
}
