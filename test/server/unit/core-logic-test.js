import {
	startGame,
	addPlayer,
	addBodyPart}		from '../../../server/core.js'
import 	{
	expect,
	assert}								from 'chai'
import {
	drawing1, 
	drawing2, 
	drawing3}			from '../../helpers/test-drawings.js'

describe('Application logic for starting a new game ', () => {
	const newGame = startGame()
	it('returns an object with "bodies" Object', () => {
		expect(Object.keys(newGame.bodies)).to.have.length(3)

		for (let num in newGame.bodies) {
			assert.equal(newGame.bodies[num].head, "")
			assert.equal(newGame.bodies[num].body, "")
			assert.equal(newGame.bodies[num].feet, "")
			assert.equal(newGame.bodies[num].final, "")
		}
	})

	it('returns an object with peep data', () =>{
		for (let num in newGame.peep) {
			assert.equal(newGame.peep[num].head, "")
			assert.equal(newGame.peep[num].body, "")
			assert.equal(newGame.peep[num].feet, "")
		}
	})

	it('returns a null value for Level ', ()=> {
		expect(newGame.level).to.be.null
	})

	it('returns a null value for progress because game not started', () =>{
		expect(newGame.progress).to.be.null
	})

	it('returns a player object, with one player', () => {
		assert.equal(newGame.players.num, 1)
		assert.equal(newGame.players[1].body, 1)
	})
})

describe ('Application logic for adding a player', () => {

	const state = startGame()
	const nextState = addPlayer(state)
	it('adds a player to the player object', () => {
		assert.equal(nextState.players.num,2)
		assert(nextState.players[2])
		expect(nextState.players[2].body).to.equal(2)
	})

	it('continues to add players', () => {
		let state = startGame()
		state = addPlayer(state)
		state = addPlayer(state)
		assert.equal(state.players.num,3)
		assert(state.players[1])
		assert(state.players[2])
		assert(state.players[3])
		expect(state.players[1].body).to.equal(1)
		expect(state.players[2].body).to.equal(2)
		expect(state.players[3].body).to.equal(3)
	})

		it('wont stops adding players once three have joined', ()=>{
			let state = startGame()
			state = addPlayer(state)
			state = addPlayer(state)
			state = addPlayer(state)
			assert.equal(state.players.num,3)
			assert(state.players[1])
			assert(state.players[2])
			assert(state.players[3])
			expect(state.players[1].body).to.equal(1)
			expect(state.players[2].body).to.equal(2)
			expect(state.players[3].body).to.equal(3)
		})

		it('starts the level when three players have joined', () => {
			let state = startGame()
			state = addPlayer(state)
			state = addPlayer(state)

			assert(state.level)
			assert.equal(state.level, 1)
		})
})

describe('Application logic addBodyPart', () => {
	const body = 1
	const part = 'head'
	const state = addPlayer(addPlayer(startGame()))
	const nextState = addBodyPart(state, body, part, drawing1)
	const content = nextState.bodies[body][part]
	
	it('updates state with a players drawing', ()=> {
		expect(content).to.have.length.above(21)
		assert.equal(content, drawing1)
	})

	it('increments the progress', () => {
		assert(nextState.progress)
	})

	it('generates peep data, and adds is to state', () => {
		const peep = nextState.peep[body][part]
		expect(peep).to.have.length.above(21)
		assert.notEqual(peep, drawing1)
	})

})