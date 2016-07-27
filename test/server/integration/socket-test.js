import {
	assert,
	expect,
	Should
} 	from 'chai'
const should = Should()

// Start server
import io from 'socket.io-client'
import {makeStore} 	from '../../../server/src/store.js'
import {startSocket}	 	from '../../../server/src/socket.js'
export const store = makeStore()
startSocket(store)
store.dispatch({type: ''})
////////


describe('New player Socket connection new game ', () => {
	let state = {}
	const socketURL = 'http://localhost:8090'

	it('returns state object featuring player.id, with on player', (done) => {
		const player1 = io.connect(socketURL, {transports: ['websocket'],'force new connection': true})

		player1.on('state', (data) => {
			data.players.should.have.property('/#'+player1.id)
			assert.equal(data.players.num, 1)
			done()
		})

	})

})

