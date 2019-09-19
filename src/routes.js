import React from 'react'
import { renderRoutes } from 'react-router-config'
import { NotFoundPage } from './features/common'
import { accountRoutes } from './features/account'

const routes = [
  ...accountRoutes(),
  {
    component: NotFoundPage,
  },
]

export const Routes = () => <>{renderRoutes(routes)}</>
