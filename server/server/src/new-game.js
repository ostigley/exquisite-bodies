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
		num: 1,
	},
	send: function (id) {
		return {
			level: this.level.current,
			body: this.bodies[this.players[id].body],
			num: this.players[id].body
		}
	}
})
export {INITIAL_STATE}
