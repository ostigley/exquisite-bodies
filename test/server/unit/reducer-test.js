import reducer	from '../../../server/reducer.js'
import 	{
	expect,
	assert}				from 'chai'
import {
	drawing1, 
	drawing2, 
	drawing3}			from '../../helpers/test-drawings.js'

	import {
	startGame,
	addPlayer,
	addBodyPart}	from '../../../server/core.js'

describe('Reducer START_GAME', () => {
	const action = {type: 'NEW_GAME'}
	const newGame = reducer(null, action)
	it('returns a frozen / immutable object', () => {
		assert(Object.isFrozen(newGame), 'it is frozen')
		assert(Object.isFrozen(newGame.bodies), 'it is frozen')
		assert(Object.isFrozen(newGame.players), 'it is frozen')
		assert(Object.isFrozen(newGame.progress), 'it is frozen')
		assert(Object.isFrozen(newGame.level), 'it is frozen')
	})

	it('returns state object with "bodies" Object', () => {
		expect(Object.keys(newGame.bodies)).to.have.length(3)

		for (let num in newGame.bodies) {
			assert.equal(newGame.bodies[num].head, "")
			assert.equal(newGame.bodies[num].body, "")
			assert.equal(newGame.bodies[num].feet, "")
			assert.equal(newGame.bodies[num].final, "")
		}
	})

	it('returns state with peep data', () =>{
		for (let num in newGame.peep) {
			assert.equal(newGame.peep[num].head, "")
			assert.equal(newGame.peep[num].body, "")
			assert.equal(newGame.peep[num].feet, "")
		}
	})

	it('returns a null value for Level ', ()=> {
		expect(newGame.level).to.be.null
	})

	it('returns a 0 value for progress because game not started', () =>{
		expect(newGame.progress).to.be.zero
	})

	it('returns a player object, with one player', () => {
		assert.equal(newGame.players.num, 1)
		assert.equal(newGame.players[1].body, 1)
	})
})


describe ('Reducer ADD_PLAYER', () => {

	const actions = [
		{type: 'NEW_GAME'},
		{type: 'ADD_PLAYER'}	
	]
	const nextState = actions.reduce(reducer, {})
	it('returns a frozen / immutable object', () => {
		assert(Object.isFrozen(nextState), 'it is frozen')
		assert(Object.isFrozen(nextState.bodies), 'it is frozen')
		assert(Object.isFrozen(nextState.players), 'it is frozen')
		assert(Object.isFrozen(nextState.progress), 'it is frozen')
		assert(Object.isFrozen(nextState.level), 'it is frozen')
	})

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

describe('Reducer ADD_DRAWING', () => {
	const body = 1
	const part = 'head'

	const actions = [
		{type: 'NEW_GAME'},
		{type: 'ADD_PLAYER'},	
		{type: 'ADD_PLAYER'},
		{
			type: 'ADD_DRAWING',
			body: body,
			part: part,
			drawing: drawing1
		}
	]
	const nextState = actions.reduce(reducer, {})
	
	const content = nextState.bodies[body][part]
	const peep = nextState.peep[body][part]
	
	it('returns a frozen / immutable object', () => {
		assert(Object.isFrozen(nextState), 'it is frozen')
		assert(Object.isFrozen(nextState.bodies), 'it is frozen')
		assert(Object.isFrozen(nextState.players), 'it is frozen')
		assert(Object.isFrozen(nextState.progress), 'it is frozen')
		assert(Object.isFrozen(nextState.level), 'it is frozen')
	})

	it('updates body with a player\'s drawing', () => {
		expect(content).to.have.length.above(21)
		assert.equal(content, drawing1)
	})

	it('increments the progress', () => {
		assert(nextState.progress)
		assert.equal(nextState.progress, 1)
	})

	it('doesn\'t increment the level initially', () => {
		assert.equal(1, nextState.level)
	})

	it('generates peep data, and adds is to state', () => {
		expect(peep).to.have.length.above(21)
		assert.notEqual(peep, drawing1)
	})

	it('increments progress to 2', () => {
		const nextState2 = addBodyPart(nextState, body+1, 'body', drawing1)
		assert.equal(nextState2.progress, 2)
	})
})