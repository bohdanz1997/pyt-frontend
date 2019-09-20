import 'antd/dist/antd.css'

import React from 'react'
import ReactDOM from 'react-dom'
import { Router } from 'react-router-dom'
import { history } from '@lib/routing'
import { App } from './app'

const root = document.getElementById('root')

const render = () => {
  ReactDOM.render(
    <Router history={history}>
      <App />
    </Router>,
    root,
  )
}

if (module.hot) {
  module.hot.accept('./app', render)
}

render()
