import {
	assert,
	expect,
	Should
} 	from 'chai'
const should = Should()
import io from 'socket.io-client'


describe('Socket should dispatch new game and broadcast to new user', () => {
	let state = {}
	const socketURL = 'http://localhost:8090'

	it('returns state object featuring player.id, with on player', () => {
		const player1 = io.connect(socketURL, {transports: ['websocket'],'force new connection': true})

		player1.on('state', (data) => {
			data.players.should.have.property('/#'+player1.id)
			assert.equal(data.players.num, 1)
		})

	})

})

