import { createEffect, createStore } from 'effector'
import { workoutApi } from '../api'
import { arrayToObject } from '@lib/array'
import { objectOmit } from '@lib/object'

export const loadSets = createEffect()
export const createSet = createEffect()
export const updateSet = createEffect()
export const removeSet = createEffect()

export const $sets = createStore({})

loadSets.use((workoutId) => workoutApi.getSets(workoutId))
createSet.use(({ workoutId, setData }) => workoutApi.createSet(workoutId, setData))
updateSet.use(({ workoutId, setId, setData }) => workoutApi.updateSet(workoutId, setId, setData))
removeSet.use(({ workoutId, setId }) => workoutApi.removeSet(workoutId, setId))

$sets.on(loadSets.done, (registry, { result }) => ({
  ...registry,
  ...arrayToObject(result.result),
}))

$sets.on(createSet.done, (sets, { result }) => ({
  ...sets,
  ...arrayToObject([result.result]),
}))

$sets.on(updateSet.done, (sets, { result }) => ({
  ...sets,
  [result.result.id]: result.result,
}))

$sets.on(removeSet.done, (sets, { result }) =>
  objectOmit(sets, result.result),
)
