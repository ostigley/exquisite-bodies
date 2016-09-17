import express from 'express'
const path = require('path');
const app = express()

export const startServer  = (store) => {
	var http = require('http').Server(app);
	var io = require('socket.io')(http);
	app.use(express.static(path.join(__dirname,'../../client/public')))
	app.get('/', function(req, res){
	  res.sendfile('index.html');
	});

	io.on('connection', (socket) => {
		
		if(store.getState().players) {
			store.dispatch({type: 'ADD_PLAYER', playerId: socket.id})
		} else {
			store.dispatch({type: 'NEW_GAME', playerId: socket.id})
			games
		}

		socket.on('action', (action) => {
			store.dispatch(action)
		})

		socket.on('disconnect', function () {
	    store.dispatch({type: 'REMOVE_PLAYER', playerId: socket.id});
	  });
	})
	
	store.subscribe(
		() => {
			const state = store.getState()
			state.send.bind(state)
			const {current, previous} = state.level
			if(current === null || current !== previous) {
				const sockets = io.sockets.connected
				for(let socket in sockets) {
					sockets[socket].emit('state', state.send(socket))
				}
			}
		}
	)

	http.listen(3000, function(){
	  console.log('listening on *:3000');
	});
} 

import {makeStore} 	from './store.js'

const newGame() => {
	let store = makeStore()
	store.dispatch({type: ''})
	return {store}
}
const GAMEMANAGER = () => {
	let gameFloor = {
		nextGameId: 1
	}

	return Object.assign(
		{},
		newPlayer(gameFloor),
		removePlayer(gameFloor),
		updateGame(gameFloor),
	)	
}

const newPlayer(gameFloor) => {
	// check if need to change nextGameId if game is full
	return {
		add: (socketId) => gameFloor[nextGameId].dispatch{
			type: 'ADD_PLAYER', 
			playerId: socketId
	}
}






