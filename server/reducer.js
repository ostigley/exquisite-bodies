import {
	startGame,
	addPlayer,
	addBodyPart} from './core.js'

export default function reducer(state = {}, action) {
  // Figure out which function to call and call it
  /*
	start game
	add player
	add drawing

*/
  switch(action.type) {
  	case('START_GAME'): 
  		return startGame()
  }
}