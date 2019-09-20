import React from 'react'
import { renderRoutes } from 'react-router-config'
import { NotFoundPage } from '@features/common'
import { accountRoutes } from '@features/account'
import { workoutRoutes } from '@features/workout'
import { templateRoutes } from '@features/template'

const routes = [
  ...accountRoutes(),
  ...workoutRoutes(),
  ...templateRoutes(),
  {
    component: NotFoundPage,
  },
]

export const Routes = () => <>{renderRoutes(routes)}</>
