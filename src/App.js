import React, { useState } from 'react'
import { hot } from 'react-hot-loader'
import { BrowserRouter, Route } from 'react-router-dom'

const Main = () => (
  <BrowserRouter>
    <div>
      HELLO2
    </div>
  </BrowserRouter>
)

export const App = hot(module)(Main)
