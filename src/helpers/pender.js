/*
	usage:
	handleActions({
		...pender({
			type: SOMETHING,
			onFulfill: (state, action) => {
				return state
			},
			onReject: (state, ction) => {
				return state
			}
		})
	})
*/

const actionize = (type) => {
	return {
		PENDING: `${type}_PENDING`,
		FULFILLED: `${type}_FULFILLED`,
		REJECTED: `${type}_REJECTED`
	}
}

const pender = ({
	type,
	name,
	onFulfill = state => state, // in case function not given
	onReject = state => state
}) => {
	const actionized = actionize(type)
	return {
		[actionized.PENDING]: (state, action) =>
			state.setIn(['pending', name], true),
		[actionized.FULFILLED]: (state, action) =>
			onFulfill(state, action).setIn(['pending', name], false),
		[actionized.REJECTED]: (state, action) =>
			onReject(state,action).setIn(['pending', name], false)
	}
}

export default pender
