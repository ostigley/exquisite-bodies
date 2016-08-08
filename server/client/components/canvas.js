import React, { Component } from 'react'
import {drawing} from '../public/canvas.js'
export default class Canvas extends React.Component{

	componentDidMount () {
		drawing()
		
	}


	render () {
		return (
			<div>
				<img src={this.props.peep[1].head}/>
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
