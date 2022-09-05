export const createHistoryEvent = <T extends keyof History>(key: T) => {
	const origin = history[key]

	return function() {
		const resp = origin.apply(this, arguments)
		const event = new Event(key)
		window.dispatchEvent(event)
		return resp
	}
}