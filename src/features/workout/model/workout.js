import { combine, createEffect, createEvent, createStore, forward, sample } from 'effector'
import { arrayToObject } from '@lib/array'
import { workoutApi } from '../api'
import { $exercises, $groups } from '@features/exercises'
import { createFetching } from '@lib/fetching'

export const workoutOpened = createEvent()
export const clearRegistry = createEvent()

export const loadWorkouts = createEffect()

export const loadSets = createEffect()
export const createWorkout = createEffect()

export const $registry = createStore({})
export const $sets = createStore([])
export const $workoutId = createStore(null)

$registry.reset(clearRegistry)

loadWorkouts.use(() => workoutApi.getList())
loadSets.use((workoutId) => workoutApi.getSets(workoutId))
createWorkout.use((workoutData) => workoutApi.create(workoutData))

$registry.on(loadWorkouts.done, (registry, { result }) => ({
  ...registry,
  ...arrayToObject(result.result),
}))

$registry.on(createWorkout.done, (workouts, { result }) => ({
  ...workouts,
  ...arrayToObject([result.result]),
}))
$sets.on(loadSets.done, (_, { result }) => result.result)

$workoutId.on(workoutOpened, (_, { workoutId }) => workoutId)

export const $openedWorkout = combine(
  $registry,
  $workoutId,
  (registry, workoutId) => registry[workoutId],
)

$openedWorkout.watch((workout) => {
  if (workout && workout.id) {
    loadSets(workout.id)
  }
})

export const $exercisesSets = combine(
  $openedWorkout,
  $exercises,
  $sets,
  (workout, exercises, sets) => {
    if (!workout) {
      return []
    }
    return (
      workout.exercises.map((exId) => ({
        ...exercises.find((ex) => ex.id === exId),
        sets: sets.filter((set) => set.exerciseId === exId),
      }))
    )
  },
)
