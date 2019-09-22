import React, { useEffect, useState } from 'react'
import { useStore } from 'effector-react'

import { Loading } from '@ui'
import { loadExercises, loadGroups } from '@features/exercises'
import { loadWorkouts } from '@features/workout'

import { $session, loadSession } from '../model/session'
import { $token } from '../model/token'
import { loadTemplates } from '@features/template'

export const AccountLoader = ({ children }) => {
  const session = useStore($session)
  const token = useStore($token)
  const [isLoading, setIsLoading] = useState(false)

  const loadData = () =>
    loadSession().then(() =>
      Promise.all([
        loadExercises(),
        loadTemplates(),
        loadGroups(),
        loadWorkouts(),
      ])
    )

  useEffect(() => {
    setIsLoading(true)
    loadData().finally(() => {
      setIsLoading(false)
    })
  }, [token])

  if (isLoading) return <Loading />
  if (token && !session) return null

  return children
}
