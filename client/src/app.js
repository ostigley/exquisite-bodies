import {Provider}	 from 'react-redux'

import React, { Component } from 'react';
import {
  Text,
  View
} from 'react-native';

import {makeStore} from './store.js'
import {Main} from './components/main.js'


const store = makeStore()

export const App = () => {
	return (
		<Provider store={store}>
			<Main />
		</Provider>
	)
}
