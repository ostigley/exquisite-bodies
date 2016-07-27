import Server from 'socket.io'

export const startSocket = (store)  => {
	const io = new Server().attach(8090)
	
	store.subscribe(
		() => io.emit('state', store.getState())
	)

	io.on('connection', (socket) => {
		console.log(`User ${socket.id} has joined`, typeof socket.id)

		if(store.getState().players) {
			store.dispatch({type: 'ADD_PLAYER', playerId: socket.id})
			console.log(store.getState())
		} else {
			store.dispatch({type: 'NEW_GAME', playerId: socket.id})
			console.log(store.getState())
		}

		socket.on('action', store.dispatch.bind(store))

	})

	console.log('Sockets listening on 8090')
}
