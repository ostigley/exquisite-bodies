// 'use strict'

import React 					from 'react'
import ReactDOM 			from 'react-dom'
import PageContainer 	from './components/page-container.js'
import io  						from 'socket.io-client'


// const store = createStore(reducer)
var state = {}

const socket = io()
socket.on('state', data => {
	state = data
	console.log(state)
})

const sendDrawing = data => {
	const state = store.getState()
	const parts = [null, 'head', 'body', 'feet']

	const action = {
		type: 'ADD_DRAWING',
		body: state.players['/#'+socket.id].body,
		part: parts[state.level.current],
		drawing: data
	}
	socket.emit('action', action)
}

const render = () => {
	ReactDOM.render(
			<PageContainer sendDrawing={sendDrawing} state={state}/>,
		document.querySelector('#eq')
	)
}

render()