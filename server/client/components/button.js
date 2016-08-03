import React, { Component } from 'react'

// module.exports = React.createClass({
	  	
//   render() {
//     return (
//     	<div>
// 	      <button id={this.props.id} onClick={this.props.onClick} > {this.props.id} </button>
//       </div>
//     )
//   }

// })

// module.exports = ({id, onClick}) => (
//     	<div>
// 	      <button id={id} onClick={onClick}>Submit</button>
//       </div>

// 	)

export class Button extends Component {
	constructor (props) {
		super(props)
	}

	handleClick () {
		const canvas = document.querySelector('canvas').toDataURL()
		
		this.props.sendDrawing(canvas)
	}

	render () {
		return (
			<div>
	      <button onClick={() => this.handleClick}>Submit</button>
      </div>
			)
	}
}

