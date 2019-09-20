import React from 'react'
import { hot } from 'react-hot-loader'
import { Routes } from './routes'
import { AccountLoader } from '@features/common'
import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle``

const Main = () => (
  <>
    <GlobalStyles />
    <AccountLoader>
      <Routes />
    </AccountLoader>
  </>
)

export const App = hot(module)(Main)
