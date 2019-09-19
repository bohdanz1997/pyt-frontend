import React from 'react'
import { hot } from 'react-hot-loader'
import { Router } from 'react-router-dom'
import { Routes } from './routes'
import { AccountLoader } from '@features/common'
import { history } from '@lib/routing'

const Main = () => (
  <Router history={history}>
    <AccountLoader>
      <Routes />
    </AccountLoader>
  </Router>
)

export const App = hot(module)(Main)
