import { request } from '@features/common'

export const accountApi = {
  createAccount: (data) => request('POST', '/users', { data }),
}

export const sessionApi = {
  createSession: (data) => request('POST', '/users/session', { data }),

  dropSession: () => request('DELETE', '/users/session'),
}
