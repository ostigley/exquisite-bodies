import crop 					from './image-functions/crop.js'
import generateFinal 	from './image-functions/final.js'

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

const scramble = (state) => {
	let players = Object.assign({}, state.players)
	for (let i = 1; i < 4; i++) {
		players[i] = players[i].body === 3 
			? {body: 1} 
			: {body: players[i].body + 1}
	}
	return players
}

export const addPlayer = state => {
	let nextState = Object.assign({},state)
	if (nextState.players.num === 3) return nextState
	
	const nextPlayer = ++state.players.num
	nextState.players[nextPlayer] = {body: nextPlayer}
	nextState.players.num = nextPlayer
	
	if(nextState.players.num === 3) {
		nextState.level = 1
	}

	return nextState
}

export const addBodyPart = (state, body, part, drawing) => {
	let nextState = Object.assign({},state)

	nextState.bodies[body][part] = drawing
	nextState.level = level(nextState)
	nextState.progress = progress(nextState)
	nextState.peep[body][part] = crop(drawing)
	nextState.players = nextState.level !== state.level 
		? scramble(nextState)
		: nextState.players
	if (nextState.level === 4) {
		nextState = generateFinal(nextState)
	}
	return nextState
}














































