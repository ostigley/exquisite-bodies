
import crop from './image-functions/crop.js'
export const startGame = () => {
	return {
		bodies: {
			1: {
				head: "",
				body: "",
				feet: "",
				final: ""
			},
			2: {
				head: "",
				body: "",
				feet: "",
				final: ""
			},
			3: {
				head: "",
				body: "",
				feet: "",
				final: ""
			}
		},
		peep: {
			1: {
				head: "",
				body: "",
				feet: ""
			},
			2: {
				head: "",
				body: "",
				feet: ""
			},
			3: {
				head: "",
				body: "",
				feet: ""
			}
		},
		level: null,
		progress: null,
		players: {
			1: {body: 1},
			num: 1
		}
	}
	}
export const addPlayer = state => {
	if (state.players.num === 3) return state
	const nextPlayer = ++state.players.num
	let nexstate = Object.assign(state)
	
	nexstate.players[nextPlayer] = {body: nextPlayer}
	nexstate.players.num = nextPlayer
	
	if(nexstate.players.num === 3) {
		nexstate.level = 1
	}

	return nexstate
}
export const addBodyPart = (state, body, part, drawing) => {
	let nextState = Object.assign(state)
	nextState.bodies[body][part] = drawing
	nextState.progress = nextState.progress 
		? nextState.progress++ 
		: 1
	return addPeepData(nextState, body, part, drawing)
}

const addPeepData = (state, body, part, drawing) => {
	const croppedDrawing = crop(drawing)
	let nextState = Object.assign(state)
	nextState.peep[body][part] = croppedDrawing
	return nextState
} 














































