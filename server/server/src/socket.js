import Server from 'socket.io'

export const startSocket = (url, http)  =>
	new Server().attach(3000)
