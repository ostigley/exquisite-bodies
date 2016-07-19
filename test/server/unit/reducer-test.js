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

	const newGame = startGame()
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