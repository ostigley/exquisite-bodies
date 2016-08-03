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

    buttonClick (num, canvas) {
      // this.state.pane[this.state.level].current = canvas.toDataURL()
      // console.log(canvas.toDataURL())
    },

    render() {
      const location = 1
      if (!this.props.level) {
       return (<App/>) 
      } else {
        return (
          <main className="container">
            <h1>hiddenDoodle</h1>
            <Section id={1} buttonClick={this.buttonClick} peep={location.peep} drawing={location.current}/>
          </main>)
      }
    }
})

const mapStateToProps = (state) => {
  return {
    level: state.level.current
  }
}

export const PageContainer = connect(
  mapStateToProps,
  actionCreators
)(Page)
