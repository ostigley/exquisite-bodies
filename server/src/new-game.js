import deepFreeze from 'deep-freeze'
const INITIAL_STATE = deepFreeze({
	bodies: {
		1: {
			head: "",
			body: "",
			feet: "",
			final: ""
		},
		2: {
			head: "",
			body: "",
			feet: "",
			final: ""
		},
		3: {
			head: "",
			body: "",
			feet: "",
			final: ""
		}
	},
	peep: {
		1: {
			head: "",
			body: "",
			feet: ""
		},
		2: {
			head: "",
			body: "",
			feet: ""
		},
		3: {
			head: "",
			body: "",
			feet: ""
		}
	},
	level: {
		current: null,
		previous: null
	},
	progress: 0,
	players: {
		1: {body: 1},
		num: 1
	}
})
export {INITIAL_STATE}
