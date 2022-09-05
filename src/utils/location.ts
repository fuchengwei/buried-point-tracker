export const createLocationScript = () => {
	const script = document.createElement('script')
	script.src = 'https://pv.sohu.com/cityjson?ie=utf-8'
	document.body.appendChild(script)
}

export const getLocationInfo = () => {
	const { cip, cid, cname } = window.returnCitySN

	return {
		ip: cip,
		cityId: cid,
		cityName: cname
	}
}
