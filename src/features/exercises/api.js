import { request } from '@features/common'

export const exercisesApi = {
  getList: () => request('GET', '/exercises'),
}

export const groupsApi = {
  getList: () => request('GET', '/groups'),
}