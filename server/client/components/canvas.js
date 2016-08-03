import React, { Component } from 'react'

export default class Canvas extends React.Component{

	componentDidMount () {
		const canvas = document.querySelectorAll('canvas')

		for (var i=0; i<canvas.length; i++) {
			canvas[i].addEventListener('mouseover', (e) => (
				initiate(e.path[0])
			))
		}
		 
		var initiate = (canvas) => {


			let ctx = canvas.getContext("2d")
			let w = canvas.width
			let h = canvas.height

			var mouse = {x: 0, y: 0}

			canvas.addEventListener('mousemove', (e) => {
				mouse.x = e.pageX - canvas.offsetLeft
				mouse.y = e.pageY - canvas.offsetTop
			}, false)

		  ctx.strokeStyle= 'black'
			ctx.lineJoin = 'round'
			ctx.lineWidth = 5
			ctx.lineCap = 'round'

			canvas.addEventListener('mousedown', (e) => {
				ctx.beginPath()
				ctx.moveTo(mouse.x, mouse.y)


				canvas.addEventListener('mousemove', onPaint, false)
			}, false)

			canvas.addEventListener('mouseup', (e) => {
				canvas.removeEventListener('mousemove', onPaint, false)
			}, false)

			canvas.addEventListener('mouseleave', (e) => {
				canvas.removeEventListener('mousemove', onPaint, false)
			}, false)

			var onPaint = () => {
				ctx.lineTo(mouse.x, mouse.y)
				ctx.stroke()
			}

		}
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
			</div>

		)
	}
}
