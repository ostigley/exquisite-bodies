import express from 'express'
const app = express()

export const startServer  = (store) => {
	var http = require('http').Server(app);
	var io = require('socket.io')(http);
	app.use(express.static('/Users/Olly/workspace/exquisite-bodies/server/client/public'))

	app.get('/', function(req, res){
	  res.sendfile('index.html');
	});

	io.on('connection', (socket) => {
		if(store.getState().players) {
			store.dispatch({type: 'ADD_PLAYER', playerId: socket.id})
			// socket.emit('state',store.getState())
		} else {
			store.dispatch({type: 'NEW_GAME', playerId: socket.id})
		}

		socket.on('action', (action) => {
			store.dispatch(action)
		})

	})
	
	store.subscribe(
		() => {
			const state = store.getState()
			const {current, previous} = state.level
			if(current === null || current !== previous) {
				io.emit('state', state)
			}
		}
	)

	http.listen(3000, function(){
	  console.log('listening on *:3000');
	});


} 

