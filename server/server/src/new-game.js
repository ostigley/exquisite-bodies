import deepFreeze from 'deep-freeze'
const INITIAL_STATE = deepFreeze({
	bodies: {
		1: {
			head: "",
			body: "",
			feet: "",
			peep: "",
			final: ""
		},
		2: {
			head: "",
			body: "",
			feet: "",
			peep: "",
			final: ""
		},
		3: {
			head: "",
			body: "",
			feet: "",
			peep: "",
			final: ""
		}
	},
	level: {
		current: null,
		previous: null
	},
	progress: 0,
	players: {
		num: 1
	}
})
export {INITIAL_STATE}
