/* globals API */
import { createAction, handleActions } from 'redux-actions'
import createPromiseAction from 'helpers/createPromiseAction'
import { Map } from 'immutable'
import S from 'string'

// Helpers
import pender from 'helpers/pender'

const GET_CHEST_LIST = 'api/GET_CHEST_LIST'
const FILTER_CHESTS = 'api/FILTER_CHESTS'

const fetchChests = () =>
	fetch('http://localhost:8001/?q=all')
		.then(res => res.json())

export const getChestList = createPromiseAction({
	type: GET_CHEST_LIST,
	promiseCreator: fetchChests
})

export const filterChests = createAction(FILTER_CHESTS, filter => filter)

const initialState = Map({
	pending: Map({
		getChestList: true,
		getPostData: true,
		getCategoryPosts: true
	}),
	apiChests: [],
	chests: []
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
	})
}, initialState)
