import { createAction, handleActions } from 'redux-actions'
import { Map } from 'immutable'

const SET_HEADER_COLOR = 'http/SET_HEADER_COLOR'

const initialState = Map({
	headerColor: 'default'
})

export const setHeaderColor = createAction(SET_HEADER_COLOR, color => color)

export default handleActions({
	[SET_HEADER_COLOR]: (state, { payload }) => {
		return state.set('headerColor', payload)
	}
}, initialState)
