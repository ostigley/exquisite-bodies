import {makeStore} 	from './src/store.js'
import {startSocket}	from './src/socket.js'
import {startServer}	from './src/server.js'
export const store = makeStore()

startSocket(store)
store.dispatch({type: ''})
startServer()


