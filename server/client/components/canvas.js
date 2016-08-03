import React, { Component } from 'react'
import {drawing} from '../public/canvas.js'
export default class Canvas extends React.Component{

	componentDidMount () {
		drawing()
		/*
			if at level 1, show canvas normally
			if at level 2 or 3, draw 25px of this.state.previos at top of canvas

		*/
		return this.updateDrawing()
	}

	componentDidUpdate() {
		return this.updateDrawing()
	}

	updateDrawing () {
		var context = this.canv.getContext('2d')
    context.clearRect(0,0,700,400)
    var imageObj = new Image()
    imageObj.src = this.props.peep
    imageObj.onload = function() { 
    	context.drawImage(imageObj, 0, 0)
	    context.clearRect(0,0,700,375)
    }
	}

	render () {
		return (
			<div>
				<canvas 
					id={this.props.id} 
					width="700px" 
					height="400px"
					ref={(c) => this.canv = c}
					>
				</canvas>
				<script src="canvas.js"></script>
			</div>

		)
	}
}
