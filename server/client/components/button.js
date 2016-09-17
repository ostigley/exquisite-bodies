import React, { Component } from 'react'

export class Button extends Component {
	constructor (props) {
		super(props)
	}

	handleClick () {
		const canvas = document.querySelector('canvas')
		this.props.sendDrawing(canvas.toDataURL())
		const ctx = canvas.getContext('2d')
		ctx.clearRect(0,0,700,400)
	}

	render () {
		return (
			<div>
	      <button onClick={() => this.handleClick()}>Submit</button>
      </div>
			)
	}
}

