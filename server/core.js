import crop from './image-functions/crop.js'

const progress = state => {
	switch(state.progress) {
		case(0): 
			return 1
		case(1): 
			return 2
		default: 
			return 0
	}
}

const level = state => {
	console.log('level, called')
		return  state.progress === 2 
			? state.level+1
			: state.level
}

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
		progress: 0,
		players: {
			1: {body: 1},
			num: 1
		}
	}
}

export const addPlayer = state => {
	let nexstate = Object.assign({},state)
	if (nexstate.players.num === 3) return nexstate
	
	const nextPlayer = ++state.players.num
	nexstate.players[nextPlayer] = {body: nextPlayer}
	nexstate.players.num = nextPlayer
	
	if(nexstate.players.num === 3) {
		nexstate.level = 1
	}

	return nexstate
}

export const addBodyPart = (state, body, part, drawing) => {
	let nextState = Object.assign({},state)

	nextState.bodies[body][part] = drawing
	nextState.level = level(nextState)
	nextState.progress = progress(nextState)
	nextState.peep[body][part] = crop(drawing)
		
	return nextState
}














































