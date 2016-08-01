// 'use strict'

import React from 'react'
import ReactDOM from 'react-dom'
import PageContainer from '../components/page-container.js'

const render = () => {
	ReactDOM.render(
		<PageContainer/>,
		document.querySelector('body')
	)

}

render()