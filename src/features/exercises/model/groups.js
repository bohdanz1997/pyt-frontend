import { createEffect, createStore } from 'effector'
import { arrayToObject } from '@lib/array'
import { groupsApi } from '../api'

export const loadGroups = createEffect()
export const $registry = createStore({})

loadGroups.use(() => groupsApi.getList())

$registry.on(loadGroups.done, (registry, { result }) => ({
  ...registry,
  ...arrayToObject(result.result),
}))
