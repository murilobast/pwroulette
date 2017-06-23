import { createAction, handleActions } from 'redux-actions'
import { Map } from 'immutable'

const SET_STATUS_CODE = 'http/SET_STATUS_CODE'

const initialState = Map({
	statusCode: 200
})

export const setStatusCode = createAction(SET_STATUS_CODE, code => code)

export default handleActions({
	[SET_STATUS_CODE]: (state, { payload }) => {
		return state.set('statusCode', payload)
	}
}, initialState)
