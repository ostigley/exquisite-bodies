import {makeStore} 	from './src/store.js'
import {startSocket}	from './src/socket.js'

export const store = makeStore()

startSocket(store)
store.dispatch({type: ''})


