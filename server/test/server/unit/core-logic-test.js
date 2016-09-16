import fs from 'fs'
import crop 					from '../../../server/src/image-functions/crop.js'
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
	drawing3,				
	drawing4,				
	drawing5,				
	drawing6}				from '../../helpers/test-drawings.js'

// describe('Application logic for starting a new game ', () => {
// 	const playerId = 123
// 	const newGame = startGame(playerId)
// 	it('returns a frozen / immutable object', () => {
// 		assert(Object.isFrozen(newGame), 'it is frozen')
// 		assert(Object.isFrozen(newGame.bodies), 'it is frozen')
// 		assert(Object.isFrozen(newGame.players), 'it is frozen')
// 		assert(Object.isFrozen(newGame.progress), 'it is frozen')
// 		assert(Object.isFrozen(newGame.level), 'it is frozen')
// 	})

// 	it('returns an object with "bodies" Object', () => {
// 		expect(Object.keys(newGame.bodies)).to.have.length(3)

// 		for (let num in newGame.bodies) {
// 			assert.equal(newGame.bodies[num].head, "")
// 			assert.equal(newGame.bodies[num].body, "")
// 			assert.equal(newGame.bodies[num].feet, "")
// 			assert.equal(newGame.bodies[num].final, "")
// 			assert.equal(newGame.bodies[num].peep, "")
// 		}
// 	})

// 	it('returns a null value for Level ', ()=> {
// 		expect(newGame.level.current).to.be.null
// 	})

// 	it('returns a null value for Level ', ()=> {
// 		expect(newGame.level.previous).to.be.null
// 	})

// 	it('returns a null value for progress because game not started', () =>{
// 		expect(newGame.progress).to.be.zero
// 	})

// 	it('returns a player object, with one player', () => {
// 		assert.equal(newGame.players.num, 1)
// 		assert.equal(newGame.players[playerId].body, 1)
// 	})
// })

// describe ('Application logic for adding a player', () => {
// 	const [player1, player2] = [1,2]
// 	const state = startGame(player1)
// 	const nextState = addPlayer(state, player2)
// 	it('returns a frozen / immutable object', () => {
// 		assert(Object.isFrozen(nextState), 'it is frozen')
// 		assert(Object.isFrozen(nextState.bodies), 'it is frozen')
// 		assert(Object.isFrozen(nextState.players), 'it is frozen')
// 		assert(Object.isFrozen(nextState.progress), 'it is frozen')
// 		assert(Object.isFrozen(nextState.level), 'it is frozen')
// 	})

// 	it('adds a player to the player object', () => {
// 		assert.equal(nextState.players.num,2)
// 		assert(nextState.players[player2])
// 		expect(nextState.players[player2].body).to.equal(2)
// 	})

// 	it('continues to add players', () => {
// 		let [player1, player2, player3] = [1,2,3]
// 		let state = startGame(player1)
// 		state = addPlayer(state, player2)
// 		state = addPlayer(state, player3)
// 		assert.equal(state.players.num,3)
// 		assert(state.players[player1])
// 		assert(state.players[player2])
// 		assert(state.players[player3])
// 		expect(state.players[player1].body).to.equal(1)
// 		expect(state.players[player2].body).to.equal(2)
// 		expect(state.players[player3].body).to.equal(3)
// 	})

// 		it('wont stops adding players once three have joined', ()=>{
// 			let [player1, player2, player3, player4] = [1,2,3,4]
// 			let state = startGame(player1)
// 			state = addPlayer(state, player2)
// 			state = addPlayer(state, player3)
// 			state = addPlayer(state, player4)
// 			assert.equal(state.players.num,3)
// 			assert(state.players[player1])
// 			assert(state.players[player2])
// 			assert(state.players[player3])
// 			expect(state.players[player1].body).to.equal(1)
// 			expect(state.players[player2].body).to.equal(2)
// 			expect(state.players[player3].body).to.equal(3)
// 		})

// 		it('starts the level when three players have joined', () => {
// 			let [player1, player2, player3] = [1,2,3]
// 			let state = startGame(player1)
// 			state = addPlayer(state, player2)
// 			state = addPlayer(state, player3)
// 			assert(state.level.current)
// 			assert.isNotOk(state.level.previous)
// 			assert.equal(state.level.current, 1)

// 		})
// })

// describe('AddBodyPart basic logic', () => {
// 	const [player1, player2, player3] = [1,2,3]
// 	const body = 1
// 	const part = 'head'
// 	const state = addPlayer(addPlayer(startGame(player1), player2), player3)
// 	const nextState = addBodyPart(state, body, part, drawing1)
// 	const content = nextState.bodies[body][part]
// 	const peep = nextState.bodies[body].peep
	
// 	//test here for player.send() function
// 	it('uses the player.send function properly', () => {
// 		const data = nextState.send(1)
// 		assert.equal(data.level, 1)
// 		expect(data.body.head).to.have.length.above(21)
// 		expect(data.body.peep).to.have.length.above(21)
// 	})

// 	it('returns a frozen / immutable object', () => {
// 		assert(Object.isFrozen(nextState), 'it is frozen')
// 		assert(Object.isFrozen(nextState.bodies), 'it is frozen')
// 		assert(Object.isFrozen(nextState.players), 'it is frozen')
// 		assert(Object.isFrozen(nextState.progress), 'it is frozen')
// 		assert(Object.isFrozen(nextState.level), 'it is frozen')
// 	})

// 	it('updates body with a player\'s drawing', () => {
// 		expect(content).to.have.length.above(21)
// 		assert.equal(content, drawing1)
// 	})

// 	it('increments the progress', () => {
// 		assert(nextState.progress)
// 		assert.equal(nextState.progress, state.progress+1)
// 	})

// 	it('doesn\'t increment the level initially', () => {
// 		assert.equal(state.level.current, nextState.level.current)
// 	})

// 	it('generates peep data, and adds is to state', () => {
// 		expect(peep).to.have.length.above(21)
// 		assert.notEqual(peep, drawing1)
// 	})

// 	it('increments progress to 2', () => {
// 		const nextState2 = addBodyPart(nextState, body+1, 'body', drawing1)
// 		assert.equal(nextState2.progress, 2)
// 	})
// })

// describe('AddBodyPart makes new level ', () => {
// 	const [player1, player2, player3] = [1,2,3]
// 	const body = 1
// 	const part = 'head'
// 	var nextState = addPlayer(addPlayer(startGame(player1), player2), player3)
	
// 	for (let i=1 ; i < 4; i ++){
// 		nextState = addBodyPart(nextState, i, part, drawing1)
// 	}
	
// 	it('increments to level 2', () => {
// 		assert.equal(nextState.level.current, 2)
// 		assert.equal(nextState.level.previous, 1)
// 	})

// 	it('increments progress back to zero', () => {
// 		assert.equal(nextState.progress, 0)
// 	})
// })

describe('AddBodyPart and scramble functions', () => {	
	console.log('scramble test')
	const [player1, player2, player3] = [1,2,3]
	const parts = ['head', 'body', 'feet']
	const  state = addPlayer(addPlayer(startGame(player1), player2), player3)
	const state1 = addBodyPart(state,  "1", 'head', drawing1)
	const state2 = addBodyPart(state1, "2",'head' , drawing2)
	const state3 = addBodyPart(state2, "3",'head' , drawing3)
	const state4 = addBodyPart(state3, "1",'body' , drawing4)
	const state5 = addBodyPart(state4, "2",'body' , drawing5)
	// const state6 = addBodyPart(state5, "3",'body' , drawing6)
	// fs.writeFile('./state5.json', JSON.stringify(state5), (err, data) => {
	// 	if (err) {
	// 		throw err
	// 	} else {
	// 		console.log('file written')
	// 	}
	// })	

	// fs.writeFile('./state4.json', JSON.stringify(state4), (err, data) => {
	// 	if (err) {
	// 		throw err
	// 	} else {
	// 		console.log('file written')
	// 	}
	// })	
	// it('does not scramble after one drawing', () => {
	// 	assert.equal(state.players[1].body, state1.players[1].body)
	// 	assert.equal(state.players[2].body, state1.players[2].body)
	// 	assert.equal(state.players[3].body, state1.players[3].body)
	// 	assert.notEqual(state.bodies[1].peep, state1.bodies[1].peep)
	// })

	// it('does not scramble after 2 drawings', () => {
	// 	assert.equal(state1.players[1].body, state2.players[1].body)
	// 	assert.equal(state1.players[2].body, state2.players[2].body)
	// 	assert.equal(state1.players[3].body, state2.players[3].body)

	// 	assert.equal(state1.bodies[1].peep, state2.bodies[1].peep)
	// 	assert.notEqual(state1.bodies[2].peep, state2.bodies[2].peep)
	// })

	// it('does scramble after 3 drawings', () => {
	// 	assert.notEqual(state2.players[1].body, state3.players[1].body)
	// 	assert.notEqual(state2.players[2].body, state3.players[2].body)
	// 	assert.notEqual(state2.players[3].body, state3.players[3].body)

	// 	assert.equal(state2.bodies[1].peep, state3.bodies[1].peep)
	// 	assert.equal(state2.bodies[2].peep, state3.bodies[2].peep)
	// 	assert.notEqual(state2.bodies[3].peep, state3.bodies[3].peep)
	// })	

	// it('does not scramble after 4 drawings', () => {
	// 	assert.equal(state3.players[1].body, state4.players[1].body)
	// 	assert.equal(state3.players[2].body, state4.players[2].body)
	// 	assert.equal(state3.players[3].body, state4.players[3].body)

	// 	assert.notEqual(state3.bodies[1].peep, state4.bodies[1].peep)
	// 	assert.equal(state3.bodies[2].peep, state4.bodies[2].peep)
	// 	assert.equal(state3.bodies[3].peep, state4.bodies[3].peep)
	// })	

	// it('does not scramble after 5 drawings', () => {
	// 	assert.equal(state4.players[1].body, state5.players[1].body)
	// 	assert.equal(state4.players[2].body, state5.players[2].body)
	// 	assert.equal(state4.players[3].body, state5.players[3].body)

	// 	assert.equal(state4.bodies[1].peep, state5.bodies[1].peep)
	// 	assert.notEqual(state4.bodies[2].peep, state5.bodies[2].peep)
	// 	// assert.equal(state4.bodies[3].peep, state5.bodies[3].peep)
	// })	

	// it('does scramble after 6 drawings', () => {
	// 	assert.notEqual(state5.players[1].body, state6.players[1].body)
	// 	assert.notEqual(state5.players[2].body, state6.players[2].body)
	// 	assert.notEqual(state5.players[3].body, state6.players[3].body)

	// 	assert.notEqual(state5.level.current, state6.level.current)

	// 	assert.notEqual(state5.bodies[1].peep, state6.bodies[1].peep)
	// 	assert.notEqual(state5.bodies[2].peep, state6.bodies[2].peep)
	// 	assert.notEqual(state5.bodies[3].peep, state6.bodies[3].peep)
	// })

	// it('players have another drawing which is not their own', () => {
	// 	for(let i = 1 ; i < 4; i ++) {
	// 		assert.notEqual(state3.players[i].body, i)
			
	// 		assert.notEqual(state6.players[i].body, state3.players[i].body)
	// 		assert.equal(
	// 			state6.bodies[i].head,
	// 			state3.bodies[i].head
	// 			)
	// 		// assert.notEqual(
	// 		// 	state6.bodies[i].peep,
	// 		// 	state3.bodies[i].peep
	// 		// 	) // get this to pass
	// 	}
	// })

	console.log('end scramble test')

})

// describe('After 9 rounds', () => {
// 	const [player1, player2, player3] = [1,2,3]
// 	const parts = ['head', 'body', 'feet']
// 	let state = addPlayer(addPlayer(startGame(player1), player2), player3)
// 	for(let i = 0; i < 3; i++) {
// 		for (let k = 1; k < 4; k ++) {
// 			state = addBodyPart(state, k, parts[i], drawing1)
// 		}
// 	}
	
// 	for(let i = 1; i < 4; i++) {
// 		it(`each player has their original drawing back: ${i}: ${JSON.stringify(state.players[i])}`, () => {
// 			assert.equal(state.players[i].body, i)
// 		})
		
// 		it('each body has a final drawing dataURL string', () => {
// 			expect(state.bodies[i].final).to.not.be.empty
// 		})

// 		it('each final drawing is a valid dataURL string', () => {
// 			expect(state.bodies[i].final).to.contain('data:image/png;base64,')
// 		})
// 	}
// })


const state4 = JSON.parse(fs.readFileSync('./state4.json', {encoding: 'utf8'}))
const state5 = JSON.parse(fs.readFileSync('./state5.json', {encoding: 'utf8'}))

describe('last ditch attempt', () => {


	// it('does some things', () => {
	// 	assert.notEqual(state4.bodies[2]['body'], state5.bodies[2][
	// 		'body'])
	// 	assert.notEqual(state4.bodies[2].peep, state5.bodies[2].peep)
	// })

	it('peep function different', () => {
		const peep4 = crop(drawing4)
		const peep5 = crop(drawing5)
		console.log(peep4)
		console.log(peep5)
		assert.notEqual(state4.bodies[2].peep, state5.bodies[2].peep)
		assert.notEqual(peep4, peep5)
	})


})