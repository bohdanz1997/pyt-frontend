import { createEffect, createStore } from 'effector'
import { workoutApi } from '../api'
import { removeById, replaceById } from '@lib/array'

export const loadSets = createEffect()
export const createSet = createEffect()
export const updateSet = createEffect()
export const removeSet = createEffect()

export const $sets = createStore([])

loadSets.use((workoutId) => workoutApi.getSets(workoutId))
createSet.use(({ workoutId, setData }) => workoutApi.createSet(workoutId, setData))
updateSet.use(({ workoutId, setId, setData }) => workoutApi.updateSet(workoutId, setId, setData))
removeSet.use(({ workoutId, setId }) => workoutApi.removeSet(workoutId, setId))

$sets.on(loadSets.done, (_, { result }) => result.result)
$sets.on(createSet.done, (sets, { result }) => sets.concat(result.result))
$sets.on(updateSet.done, (sets, { result }) => replaceById(sets, result.result.id, result.result))
$sets.on(removeSet.done, (sets, { result }) => removeById(sets, result.result))
