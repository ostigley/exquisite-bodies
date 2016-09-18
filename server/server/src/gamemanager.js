import {makeStore} 	from './store.js'

const newGame = () => {
	let store = makeStore()
	store.dispatch({type: ''})
	return {store}
}

const subscribePlayer = (io, socket, game) => {
	game.subscribe( () => {
		const state = store.getState()
		const {current, previous} = state.level
		if(current === null || current !== previous) {
				socket.emit('state', state.send.call(state, socket.id))
		}
	}
	)
}

const newPlayer = (gameFloor, players, io) => {
	// check if need to change nextGameId if game is full

	return {
		add: socket => {
			
			if (gameFloor.freeGames.length === 0) {
				let newgame = makeStore()
				let gameId = newgame.getState().gameId
				gameFloor[gameId] = newgame
				gameFloor.freeGames.push(gameId)
			}

			const game = gameFloor.freeGames[0]
			//subscribe player to game changes
			subscribePlayer(io, socket, game)

			//update game
			game.dispatch({
					type: 'ADD_PLAYER', 
					playerId: socket.id
			})

			//update game manager
			players[socketId] = game.getState().gameId

			gameFloor.nextGameId = game.gestState().players.num === 3 
				? nextGameId++
				: nextGameId
		}
}

const removePlayer = (gameFloor, players) => {
	return {
		eject: socketId => {
			const game = gameFloor[players[socketId]]
			game.dispatch({
				type: 'REMOVE_PLAYER'
				playerId: socketId
			})
			delete players[socketId]
			//change nextgame id to an array of empty games
		}
	}
}

const updateGame = (gameFloor) => {
	return {
		play: (socketId, data) => {
			const game = gameFloor[players[socketId]]
			game.dispatch(data)
		}
	}
}

export const GAMEMANAGER = (io) => {
	let gameFloor = {
		nextGameId: 1
	}

	let players = {}

	return Object.assign(
		{},
		newPlayer(gameFloor, players, io),
		removePlayer(gameFloor, players),
		updateGame(gameFloor),
	)	
}





