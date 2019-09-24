import { createEffect, createEvent, createStore } from 'effector'
import { arrayToObject } from '@lib/array'
import { objectOmit } from '@lib/object'
import { workoutApi } from '../api'

export const clearRegistry = createEvent()

export const loadWorkouts = createEffect()
export const createWorkout = createEffect()
export const removeWorkout = createEffect()

export const $registry = createStore({})

$registry.reset(clearRegistry)

loadWorkouts.use(() => workoutApi.getList())
createWorkout.use((workoutData) => workoutApi.create(workoutData))
removeWorkout.use((workoutId) => workoutApi.remove(workoutId))

$registry.on(loadWorkouts.done, (registry, { result }) => ({
  ...registry,
  ...arrayToObject(result.result),
}))

$registry.on(createWorkout.done, (workouts, { result }) => ({
  ...workouts,
  ...arrayToObject([result.result]),
}))

$registry.on(removeWorkout.done, (workouts, { result }) =>
  objectOmit(workouts, result.result)
)
