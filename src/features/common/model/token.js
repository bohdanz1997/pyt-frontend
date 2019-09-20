import * as Cookies from 'browser-cookies'
import { createEvent, createStore } from 'effector'
import { loadSession } from './session'

const TOKEN_ID = 'pyt-token'

export const tokenChanged = createEvent()
export const tokenDropped = createEvent()

export const $token = createStore(Cookies.get(TOKEN_ID) || null)

$token.on(tokenChanged, (_, token) => token)
$token.on(tokenDropped, () => null)

$token.watch((token) => {
  if (token) {
    Cookies.set(TOKEN_ID, token)
    // loadSession is not initialized on current tick,
    // so deffer it to next tick
    setTimeout(() => loadSession(), 0)
  }
})

tokenDropped.watch(() => Cookies.erase(TOKEN_ID))
