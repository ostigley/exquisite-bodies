import crop 					from './image-functions/crop.js'
import generateFinal 	from './image-functions/final.js'
import {INITIAL_STATE}from './new-game.js'
import clone					from 'clone'
import deepFreeze 		from 'deep-freeze'

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
		const {current} = state.level
		return  state.progress === 2 
			? {current: current+1, previous: current}
			: state.level
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

export const startGame = () => {
	return INITIAL_STATE
}


export const addPlayer = state => {
	let nextState = clone(state)
	if (nextState.players.num === 3) return Object.freeze(nextState)
	const nextPlayer = nextState.players.num+1
	nextState.players[nextPlayer] = {body: nextPlayer}
	nextState.players.num = nextPlayer
	
	if(nextState.players.num === 3) {
		nextState.level.current = 1
	}

	return deepFreeze(nextState)
}

export const addBodyPart = (state, body, part, drawing) => {
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














































