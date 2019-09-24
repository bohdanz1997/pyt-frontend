import { combine, createEvent, createStore } from 'effector'
import { $exercisesRegistry } from '@features/exercises'
import { $sets, loadSets } from '../../model/set'
import { $registry } from '../../model/workout'

export const pageMounted = createEvent()

export const $workoutId = createStore(null)

$workoutId.on(pageMounted, (_, workoutId) => workoutId)

export const $workout = combine(
  $registry,
  $workoutId,
  (registry, workoutId) => registry[workoutId],
)

$workout.watch((workout) => {
  if (workout && workout.id) {
    loadSets(workout.id)
  }
})

export const $setsIsLoading = loadSets.pending.map(((pending) => pending))

export const $exercisesSets = combine(
  $workout,
  $exercisesRegistry,
  $sets,
  (workout, exercises, sets) => {
    if (!workout) {
      return []
    }
    return (
      workout.exercises.map((exId) => ({
        ...exercises[exId],
        sets: sets.filter((set) => set.exerciseId === exId),
      }))
    )
  },
)
