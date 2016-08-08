import Server from 'socket.io'

export const startSocket = (store, http)  => {


	// const io = new Server().attach(8090)
	
	// store.subscribe(
	// 	() => {
	// 		const state = store.getState()
	// 		if(state.level) {
	// 			const {current, previous} = state.level
	// 			if(current !== previous) {
	// 				io.emit('state', state)
	// 			}
	// 		}
	// 	}
	// )

	// io.on('connection', (socket) => {
	// 	if(store.getState().players) {
	// 		store.dispatch({type: 'ADD_PLAYER', playerId: socket.id})
	// 	} else {
	// 		store.dispatch({type: 'NEW_GAME', playerId: socket.id})
	// 	}

	// 	socket.on('action', store.dispatch.bind(store))

	// })

}
