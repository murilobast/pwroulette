import isDev from 'helpers/isDev'

const getApiUrl = () => {
	if (isDev || !process.browser)
		return 'http://127.0.0.1:8081/api'
	const { protocol, hostname } = location
	return `${protocol}//${hostname}:8081/api`
}

export default getApiUrl
