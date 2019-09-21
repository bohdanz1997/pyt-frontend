import { useEffect } from 'react'
import { useStore } from 'effector-react'

import { $session, loadSession } from '../model/session'
import { $token } from '../model/token'
import { loadExercises, loadGroups } from '@features/exercises'

export const AccountLoader = ({ children }) => {
  const session = useStore($session)
  const token = useStore($token)

  useEffect(() => {
    loadSession()
    loadExercises()
    loadGroups()
  }, [])

  if (token && !session) return null

  return children
}
