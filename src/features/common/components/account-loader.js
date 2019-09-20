import { useEffect } from 'react'
import { useStore } from 'effector-react'

import { $session, loadSession } from '../model/session'
import { $token } from '../model/token'

export const AccountLoader = ({ children }) => {
  const session = useStore($session)
  const token = useStore($token)

  // useEffect(() => {
  //   loadSession()
  // }, [])

  if (token && !session) return null

  return children
}
