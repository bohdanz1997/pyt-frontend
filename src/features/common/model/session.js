import { createEffect, createEvent, createStore, forward } from 'effector'
import { request } from '@features/common'
import { tokenDropped } from './token'

const api = {
  getCurrentAccount: () => request('GET', '/users/session'),
}

export const sessionDropped = createEvent()

export const loadSession = createEffect()

export const $session = createStore(null)
export const $isAuthenticated = $session.map(
  (session) => session !== null,
)

loadSession.use(() => api.getCurrentAccount())

$session
  .reset(sessionDropped)
  .on(loadSession.done, (_, { result }) => result.result)
  .on(loadSession.fail, () => null)

forward({ from: loadSession.fail, to: tokenDropped })
forward({ from: sessionDropped, to: tokenDropped })
