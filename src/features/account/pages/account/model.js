import { createEvent } from 'effector'
import { sessionDropped } from '@features/common'
import { sessionApi } from '@features/account/api'
import { history } from '@lib/routing'

export const logoutPressed = createEvent()

logoutPressed.watch(() => {
  sessionApi.dropSession()
  sessionDropped()
  history.push('/login')
})
