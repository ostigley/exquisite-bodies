import React, { Component } from 'react'
import Section from './section.js'



var canvasCount = 1




module.exports = React.createClass({

    drawImage (canvas, data) { 
      this.setState(data)
    },

    buttonClick (num, canvas) {
      // this.state.pane[this.state.level].current = canvas.toDataURL()
      // console.log(canvas.toDataURL())
    },

    render() {
      const location = 1
    	return (
			<main className="container">
    		<h1>hiddenDoodle</h1>
     		 	<Section id={1} buttonClick={this.buttonClick} peep={location.peep} drawing={location.current}/>
    		
  		</main>
  		)
    }
})




