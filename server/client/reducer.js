
export default function reducer (state = {}, action) {
	switch (action.type) {
		case 'SET_STATE':
			return state
		case 'ADD_DRAWING': 
			return addBodyPart(action.data, action.body)
	}

}


import clone from 'clone'

export const addBodyPart = (drawing) => {
	let nextState = clone(state)

	nextState.bodies[body][part] = drawing
	nextState.level = level(nextState)
	nextState.progress = progress(nextState)
	nextState.peep[body][part] = crop(drawing)
	nextState.players = nextState.level.current !== state.level.current 
		? scramble(nextState)
		: nextState.players
	if (nextState.level.current === 4) {
		nextState = generateFinal(nextState)
	}
	return deepFreeze(nextState)
}

