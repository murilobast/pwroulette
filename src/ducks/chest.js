import { createAction, handleActions } from 'redux-actions'

const OPEN_CHEST = 'chest/OPEN_CHEST'

const initialState = {
	opened: 0,
	items: []
}

export const openChest = createAction(OPEN_CHEST, code => code)

const getRandomChest = items => {
	const random = Math.random()
	return items.find(({ weight }) => random <= weight)
}

export default handleActions({
	[OPEN_CHEST]: (state, { payload }) => {
		let { opened } = state
		const item = getRandomChest(payload)
		let items = [...state.items]
		const index = items.findIndex(({ id }) => id === item.id)

		if (index > -1)
			items[index].total += 1

		else
			items.push(item)

		opened += 1

		return {
			...state,
			items,
			opened
		}
	}
}, initialState)
