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
const socketURL = 'http://localhost:8090'
startSocket(store)
store.dispatch({type: ''})
////////


describe('New players Socket connection new game ', () => {
	let state = {}

	it('returns state object featuring player.id, with on player', (done) => {
		const player1 = io.connect(socketURL, {transports: ['websocket'],'force new connection': true})
		player1.on('connect', () => {
			const player2 = io.connect(socketURL, {transports: ['websocket'],'force new connection': true})
			
			player2.on('connect', () => {

				player1.on('state', (data) => {
					data.players.should.have.property('/#'+player1.id)
					assert.equal(data.players.num, 2)
					assert.isNotOk(data.level.previous)
					assert.isNotOk(data.level.current)
				})

				player2.on('state', (data) => {
					data.players.should.have.property('/#'+player1.id)
					assert.equal(data.players.num, 2)
					assert.isNotOk(data.level.previous)
					assert.isNotOk(data.level.current)
				})

				const player3 = io.connect(socketURL, {transports: ['websocket'],'force new connection': true})
				player3.on('connect', () => {
					player3.on('state', (data) => {
					data.players.should.have.property('/#'+player1.id)
					assert.equal(data.players.num, 3)
					assert.isNotOk(data.level.previous)
					assert.equal(data.level.current,1)
					player2.emit('action', {type: 'RESET'})
					done()
				})
				})
			})
		})
	})
})
