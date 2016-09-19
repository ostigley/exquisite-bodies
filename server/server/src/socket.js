import Server from 'socket.io'

export const startSocket = (url, http)  => {

	const io = new Server().attach(3000)
	io.on('connection', (socket) => {
	})
}
