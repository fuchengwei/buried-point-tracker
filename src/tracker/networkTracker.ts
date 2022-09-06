import { proxy } from 'ajax-hook'
import { reportTracker } from '@/utils'

import type { IOptions } from '@/types'

export const networkTracker = (options: IOptions) => {
	proxy({
		onResponse: (response, handler) => {
			handler.next(response)
			reportTracker(options, {
				type: 'NETWORK_INFO',
				eventName: 'xhrResponse',
				xhrResponse: response
			})
		},
		onError: (err, handler) => {
			handler.next(err)
			reportTracker(options, {
				type: 'NETWORK_ERROR',
				eventName: 'xhrError',
				xhrError: err
			})
		}
	})
}
