import { createEffect, createStore } from 'effector'
import { exercisesApi } from '../api'
import { arrayToObject } from '@lib/array'

export const loadExercises = createEffect()
export const $registry = createStore({})

loadExercises.use(() => exercisesApi.getList())

$registry.on(loadExercises.done, (registry, { result }) => ({
  ...registry,
  ...arrayToObject(result.result),
}))
