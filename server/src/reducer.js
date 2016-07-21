import {
	startGame,
	addPlayer,
	addBodyPart} from './core.js'

export default function reducer(state = {}, action) {
  switch(action.type) {
  	case('NEW_GAME'): 
  		return startGame()
  	case('ADD_PLAYER'):
  		return addPlayer(state)
  	case('ADD_DRAWING'): 
  		return addBodyPart(state, action.body, action.part, action.drawing)
    default: 
      return state
  }
}