/* globals API */
import { createAction, handleActions } from 'redux-actions'
import createPromiseAction from 'helpers/createPromiseAction'
import { Map } from 'immutable'
import S from 'string'
import axios from 'axios'

// Helpers
import pender from 'helpers/pender'

const GET_CHEST_LIST = 'api/GET_CHEST_LIST'
const GET_SINGLE_CHEST = 'api/GET_SINGLE_CHEST'
const FILTER_CHESTS = 'api/FILTER_CHESTS'
let currentUrl = '/'
if (process.browser) {
	const { protocol, hostname } = location
	currentUrl = `${protocol}//${hostname}`
}
console.log(`${currentUrl}:8001/?q=all`)
const fetchChests = () =>
	axios(`${currentUrl}:8001/?q=all`)
		.then(res => res.data)

const fetchSingleChest = id =>
	axios(`${currentUrl}:8001/?q=${id}`)
		.then(res => res.data)

export const getChestList = createPromiseAction({
	type: GET_CHEST_LIST,
	promiseCreator: fetchChests
})

export const getSingleChest = createPromiseAction({
	type: GET_SINGLE_CHEST,
	promiseCreator: fetchSingleChest
})

export const filterChests = createAction(FILTER_CHESTS, filter => filter)

const initialState = Map({
	pending: Map({
		getChestList: true,
		getSingleChest: true
	}),
	apiChests: [],
	chests: [],
	chest: {}
})

export default handleActions({
	[FILTER_CHESTS]: (state, action) => {
		const parsedQuery = S(action.payload.toLowerCase()).latinise()
		const filteredChests = state.get('apiChests').filter(({ name }) => {
			const parsedName = S(name.toLowerCase()).latinise()
			return S(parsedName).contains(parsedQuery)
		})

		return state.set('chests', filteredChests)
	},
	...pender({
		type: GET_CHEST_LIST,
		name: 'getChestList',
		onFulfill: (state, action) => {
			return state.set('apiChests', action.payload)
				.set('chests', action.payload)
		}
	}),
	...pender({
		type: GET_SINGLE_CHEST,
		name: 'getSingleChest',
		onFulfill: (state, action) => {
			return state.set('chest', action.payload)
		}
	})
}, initialState)
