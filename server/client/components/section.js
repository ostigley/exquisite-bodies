import React, { Component } from 'react'
import Canvas from './canvas'
import Cover from './cover'
import Button from './button'

module.exports = React.createClass({

  handleClick() {
    this.props.buttonClick(this.props.id, document.getElementById('canvas-' + this.props.id))
  },

  render() {

    return (
      <section id={this.props.id}>
        <p>Section {this.props.id}</p>
        <Canvas id={"canvas-"+ this.props.id} drawing={this.props.drawing} peep={this.props.peep} />
        <Cover id={"cover-"+ this.props.id}/>
        <Button id={"button-"+ this.props.id} onClick={this.handleClick} />
      </section>
    )
  }

})
