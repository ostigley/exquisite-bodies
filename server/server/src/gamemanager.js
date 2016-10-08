import {makeStore} 	from './store.js'

const newGame = () => {
	let store = makeStore()
	store.dispatch({type: ''})
	return {store}
}

const subscribePlayer = (io, socket, game) => {
	game.subscribe( () => {
		const state = game.getState()
		const {current, previous} = state.level
		const valid = state.players.hasOwnProperty(socket.id)
		if((current === null || current !== previous) && valid) {
				return socket.emit('state', state.send.call(state, socket.id))

		}
	}
	)
}

const newPlayer = (gameFloor, io) => {
	// check if need to change nextGameId if game is full

	return {
		add: socket => {
			if (gameFloor.freeGames.length === 0) {
				let newgame = makeStore();
				let gameId = Math.floor(Math.random()*(10000000000-1000000))
				gameFloor.activeGames[gameId] = newgame;
				gameFloor.freeGames.push(gameId);
			}
			const gameId = gameFloor.freeGames[0]
			const game = gameFloor.activeGames[gameId]
			gameFloor.players[socket.id] = gameId

			//subscribe player to game changes
			subscribePlayer(io, socket, game)

			//update game
			game.dispatch({
					type: 'ADD_PLAYER',
					playerId: socket.id,
					gameId: gameId
			})

			gameFloor.freeGames = updateFreeGames(game, gameFloor.freeGames)
			console.log(socket.id, 'joined game:', gameId)
		}
	}
}

const updateFreeGames = (game, freeGames) => {
	if (game.getState().players.num === 3) {
		freeGames.splice(freeGames.indexOf(game.getState().gameId), 1)
	}
	return freeGames

}

const removePlayer = (gameFloor) => {
	return {
		eject: socket => {
			const gameId = gameFloor.players[socket.id]
			const game = gameFloor.activeGames[gameId]
			const freeGames = gameFloor.freeGames
			game.dispatch({
				type: 'REMOVE_PLAYER',
				playerId: socket.id
			})
			delete gameFloor.players[socket.id]
			if (!freeGames.includes(gameId)) {
				freeGames.push(gameId)
			}
		}
	}
}

const updateGame = (gameFloor) => {
	return {
		play: (socketId, data) => {
			const gameId = gameFloor.players[socketId]
			const game = gameFloor.activeGames[gameId]
			game.dispatch(data)
			console.log(
				socketId,
				'Updated game',
				gameFloor.players[socketId]
				)

		}
	}
}

export const GAMEMANAGER = (io) => {
	let gameFloor = {
		activeGames: {},
		freeGames: [],
		players: {}
	}

	let players = {}

	return Object.assign(
		{},
		newPlayer(gameFloor, io),
		removePlayer(gameFloor),
		updateGame(gameFloor),
		{print: () => Object.assign({},gameFloor)}
	)

}





