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
			: {current: current, previous: current}
}

const scramble = (state) => {
	let players = Object.assign({}, state.players)
	// const ids = Object.keys(players).slice(1,4)
	let ids = Object.keys(players)
	ids.splice(ids.indexOf('num'), 1)//remove num property
	for (let i = 0; i < 3; i++) {
		players[ids[i]] = players[ids[i]].body === 3 
			? {body: 1} 
			: {body: players[ids[i]].body + 1}
	}
	return players
}

export const startGame = (playerId) => {
	const nextState = clone(INITIAL_STATE)
	nextState.players[playerId] = {body: 1}
	return deepFreeze(nextState)
}


export const addPlayer = (state, playerId) => {
	let nextState = clone(state)
	if (nextState.players.num === 3) return Object.freeze(nextState)
	const nextPlayer = nextState.players.num+1
	nextState.players[playerId] = {body: nextPlayer}
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
	nextState.bodies[body].peep = crop(drawing)
	nextState.players = nextState.level.current !== state.level.current 
		? scramble(nextState)
		: nextState.players
	if (nextState.level.current === 4) {
		nextState = generateFinal(nextState)
	}
	return deepFreeze(nextState)
}














































