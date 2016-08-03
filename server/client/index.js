// 'use strict'

import React 					from 'react'
import ReactDOM 			from 'react-dom'
import {PageContainer} 	from './components/page-container.js'
import io  						from 'socket.io-client'
import App						from './components/app.js'
import {Provider}			from 'react-redux'
import {createStore}	from 'redux'
import reducer 				from './reducer'
import {setState}			from './action-creators.js'
import {INITIAL_STATE}from '../server/src/new-game.js'

const store = createStore(reducer)
store.dispatch(setState(INITIAL_STATE))

const socket = io()
socket.on('state', state => {
	store.dispatch(setState(state))
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

ReactDOM.render(
	<Provider store={store}>
		<PageContainer sendDrawing={sendDrawing} />
	</Provider>,
	document.querySelector('#eq')
)
