import React from 'react'
import { useStore } from 'effector-react'

import { AuthOnlyView } from './auth-only'
import { $session } from '../model/session'

const WithAccount = ({ renderExists, renderEmpty, render }) => {
  const session = useStore($session)

  if (session && renderExists) {
    return renderExists({ account: session })
  }

  if (!session && renderEmpty) {
    return renderEmpty({ account: session })
  }

  return render
    ? render({ account: session })
    : null
}

export const Authenticated = ({ render }) => (
  <WithAccount
    renderExists={render}
    renderEmpty={AuthOnlyView}
  />
)
