import {
	startGame,
	addPlayer,
	addBodyPart}		from '../../../server/src/core.js'
import 	{
	expect,
	assert}					from 'chai'
import {
	drawing1, 
	drawing2, 
	drawing3}				from '../../helpers/test-drawings.js'

describe('Application logic for starting a new game ', () => {
	const newGame = startGame()
	it('returns a frozen / immutable object', () => {
		assert(Object.isFrozen(newGame), 'it is frozen')
		assert(Object.isFrozen(newGame.bodies), 'it is frozen')
		assert(Object.isFrozen(newGame.players), 'it is frozen')
		assert(Object.isFrozen(newGame.progress), 'it is frozen')
		assert(Object.isFrozen(newGame.level), 'it is frozen')
	})

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
		expect(newGame.progress).to.be.zero
	})

	it('returns a player object, with one player', () => {
		assert.equal(newGame.players.num, 1)
		assert.equal(newGame.players[1].body, 1)
	})
})

describe ('Application logic for adding a player', () => {

	const state = startGame()
	const nextState = addPlayer(state)
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

describe('AddBodyPart basic logic', () => {
	const body = 1
	const part = 'head'
	const state = addPlayer(addPlayer(startGame()))
	const nextState = addBodyPart(state, body, part, drawing1)
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
		assert.equal(nextState.progress, state.progress+1)
	})

	it('doesn\'t increment the level initially', () => {
		assert.equal(state.level, nextState.level)
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

describe('AddBodyPart makes new level ', () => {
	const body = 1
	const part = 'head'
	var nextState = addPlayer(addPlayer(startGame()))
	
	for (let i=1 ; i < 4; i ++){
		nextState = addBodyPart(nextState, i, part, drawing1)
	}
	
	it('increments to level 2', () => {
		assert.equal(nextState.level, 2)
	})

	it('increments progress back to zero', () => {
		assert.equal(nextState.progress, 0)
	})
})

describe('AddBodyPart three times, scrambles player bodies', () => {	
	const parts = ['head', 'body', 'feet']
	const state = addPlayer(addPlayer(startGame()))
	const state1 = addBodyPart(state, 1, parts[0], drawing1)
	const state2 = addBodyPart(state1, 2, parts[0], drawing2)
	const state3 = addBodyPart(state2, 3, parts[0], drawing3)
	
	it('players have another drawing which is not their own', () => {
		for(let i = 1 ; i < 4; i ++) {
			assert.notEqual(state3.players[i].body, i)
		}
	})
})

describe('After 9 rounds', () => {
	const parts = ['head', 'body', 'feet']
	let state = addPlayer(addPlayer(startGame()))
	for(let i = 0; i < 3; i++) {
		for (let k = 1; k < 4; k ++) {
			state = addBodyPart(state, k, parts[i], drawing1)
		}
	}
	
	for(let i = 1; i < 4; i++) {
		it(`each player has their original drawing back: ${i}: ${JSON.stringify(state.players[i])}`, () => {
			assert.equal(state.players[i].body, i)
		})
		
		it('each body has a final drawing dataURL string', () => {
			expect(state.bodies[i].final).to.not.be.empty
		})

		it('each final drawing is a valid dataURL string', () => {
			expect(state.bodies[i].final).to.contain('data:image/png;base64,')
		})
	}
})


