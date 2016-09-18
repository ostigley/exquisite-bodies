import express from 'express'
import {GAMEMANAGER} from './gamemanager.js'

const path = require('path');
const app = express()

export const startServer  = () => {
	const http = require('http').Server(app)
	const io = require('socket.io')(http)

	const gamemanager = GAMEMANAGER(io)

	app.use(express.static(path.join(__dirname,'../../client/public')))
	app.get('/', function(req, res){
	  res.sendfile('index.html')
	});

	io.on('connection', (socket) => {
		gamemanager.add(socket)
		gamemanager

		if(store.getState().players) {
			store.dispatch({type: 'ADD_PLAYER', playerId: socket.id})
		} else {
			store.dispatch({type: 'NEW_GAME', playerId: socket.id})
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

