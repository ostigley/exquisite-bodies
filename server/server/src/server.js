import express from 'express'
import {GAMEMANAGER} from './gamemanager.js'

const path = require('path');
const app = express()

export const startServer  = () => {
	const http = require('http').Server(app)
	const io = require('socket.io')(http)

	const gameManager = GAMEMANAGER(io)

	app.use(express.static(path.join(__dirname,'../../client/public')))
	app.get('/', function(req, res){
	  res.sendfile('index.html')
	});

	io.on('connection', socket => {
		gameManager.add(socket)

		socket.on('action', action => {
			gameManager.play(socket.id, action)
		})

		socket.on('disconnect', function () {
			console.log(socket.id, 'disconnected')
			gameManager.eject(socket)
	  });
	})


	http.listen(3000, function(){
	  console.log('listening on *:3000');
	});
}

