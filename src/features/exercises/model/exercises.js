import { createEffect, createStore } from 'effector'
import { exercisesApi } from '../api'

export const loadExercises = createEffect()
export const $exercises = createStore([])

loadExercises.use(() => exercisesApi.getList())

$exercises.on(loadExercises.done, (_, { result }) => result.result)
