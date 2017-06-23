/* globals API */
import axios from 'axios'

const { API_KEY, BASE, AUTHENTICATE } = API

const generateEndpoint = path => `${BASE}${path}`

export const apiRequest = (method, path) => {
	return axios(generateEndpoint(path), { method })
		.then(res => res.data.body)
}

export const setDefaults = () => {
	axios.defaults.headers.common['App'] = API_KEY

	return axios(generateEndpoint(AUTHENTICATE))
		.then(res => {
			axios.defaults.headers.common['Token'] = res.data.token

			return res
		}).catch(err => console.log(err))
}
