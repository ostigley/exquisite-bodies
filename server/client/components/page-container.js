import React, { Component } from 'react'
import Section from './section.js'
import {connect} from 'react-redux'
import {App} from './app.js'
import * as actionCreators from '../action-creators.js'
var canvasCount = 1

const Page =  React.createClass({

    drawImage (canvas, data) { 
      this.setState(data)
    },

    render() {
      const location = 1
      if (!this.props.level) {
       return (<App/>) 
      } else if (this.props.level === 4) {
        return (
          <img className="final-image" src={this.props.final}/>)
      } else {
        return (
          <main className="container">
            <Section id={1} sendDrawing={this.props.sendDrawing} peep={this.props.peep} drawing={location.current}/>
          </main>)
      }
    }
})

const mapStateToProps = (state) => {
  return {
    level: state.level,
    peep: state.body.peep,
    final: state.body.final
  }
}

export const PageContainer = connect(
  mapStateToProps,
  actionCreators
)(Page)
