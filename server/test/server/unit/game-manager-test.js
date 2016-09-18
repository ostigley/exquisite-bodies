import {GAMEMANAGER} from '../../../server/src/gamemanager.js'
import {assert, expect} from 'chai'
import io 								from 'socket.io-client'
const socketURL = 'http://localhost:3000'
    
describe('The GAMEMANAGER', () => {

	const gameManager = GAMEMANAGER(io)
	const player1 = io.connect(socketURL, {transports: ['websocket'],'force new connection': true})		
	const player2 = io.connect(socketURL, {transports: ['websocket'],'force new connection': true})		
	const player3 = io.connect(socketURL, {transports: ['websocket'],'force new connection': true})		
	const player4 = io.connect(socketURL, {transports: ['websocket'],'force new connection': true})		
	const player5 = io.connect(socketURL, {transports: ['websocket'],'force new connection': true})		
	const player6 = io.connect(socketURL, {transports: ['websocket'],'force new connection': true})		

	it('returns an object with an add method', () => {
		expect(gameManager).to.have.property('add')
		expect(gameManager.add).to.be.a('function')
	})

	describe('Adding 3 players', () => {
		gameManager.add(player1)
		gameManager.add(player2)
		gameManager.add(player3)
		let freeGames = gameManager.print().freeGames
		let games = Object.keys(gameManager.print())
		games.splice(games.indexOf('freeGames'), 1)
		let game1 = gameManager.print()[games[0]].getState()

		it('adds players 1, 2 and 3 to the first game', () => {
			assert.equal(games.length, 1)
			assert.equal(freeGames.length, 0)
			expect(game1.players.num).to.equal(3)
		})

		describe('Adding 3 more players', () => {
			gameManager.add(player4)
			gameManager.add(player5)
			gameManager.add(player6)
			let freeGames = gameManager.print().freeGames
			let games = Object.keys(gameManager.print())
			games.splice(games.indexOf('freeGames'), 1)
			let game2 = gameManager.print()[games[1]].getState()
			
			it('adds players 4, 5, and 6 to game 2', () => {
				assert.equal(games.length, 2)
				assert.equal(freeGames.length, 0)
				expect(game2.players.num).to.equal(3)
			})
		})
	})

})