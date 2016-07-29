
export default function reducer(state = {}, action) {
  switch(action.type) {
  	case('SET_STATE'): 
  		return state
  	case('ADD_DRAWING'):
  		return //addBodyPart(state, action.body, action.part, action.drawing)
    default: 
      return state
  }
}