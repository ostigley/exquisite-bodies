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

module.exports = ({id, onClick}) => (
    	<div>
	      <button id={id} onClick={onClick}>Submit</button>
      </div>

	)


