import React, { Component } from 'react'
import Canvas from './canvas'
import {Button} from './button'

module.exports = React.createClass({


  render() {
    return (
      <section id={this.props.id}>
        <p>Section {this.props.id}</p>
        <Canvas id={"canvas-"+ this.props.id} drawing={this.props.drawing} peep={this.props.peep} />
        <Button sendDrawing={this.props.sendDrawing} />
      </section>
    )
  }

})
