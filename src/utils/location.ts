export const createLocationScript = (): Promise<void> => {
	return new Promise((resolve) => {
		const script = document.createElement('script')
		script.src = 'https://pv.sohu.com/cityjson?ie=utf-8'
		document.body.appendChild(script)

		script.onload = () => {
			resolve()
		}
	})
}

export const getLocationInfo = () => {
	const { cip, cid, cname } = window.returnCitySN

	return {
		ip: cip,
		cityId: cid,
		cityName: cname
	}
}
