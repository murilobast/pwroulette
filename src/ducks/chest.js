import { createAction, handleActions } from 'redux-actions'

const OPEN_CHEST = 'chest/OPEN_CHEST'
const RESET_CHEST = 'chest/RESET_CHEST'

const initialState = {
	opened: 0,
	items: []
}

export const openChest = createAction(OPEN_CHEST, code => code)
export const resetChests = createAction(RESET_CHEST, code => code)

const getRandomChest = items => {
	const random = Math.random()
	return [...items].find(({ weight }) => random <= weight)
}

export default handleActions({
	[RESET_CHEST]: state => ({
		...state,
		items: [...initialState.items],
		opened: 0
	}),
	[OPEN_CHEST]: (state, { payload }) => {
		let { opened } = state
		const item = getRandomChest(payload)
		const items = [...state.items]
		console.log(item)
		const index = items.findIndex(({ id }) => id === item.id)

		if (index > -1) {
			const foundItem = items[index]
			foundItem.total += foundItem.amount
		} else {
			item.total = item.amount
			items.push(item)
		}

		opened += 1

		return {
			...state,
			items,
			opened
		}
	}
}, initialState)
