import { combine, createEvent, createStore, createStoreObject, sample } from 'effector'
import { range } from '@lib/array'
import { objectFilter } from '@lib/object'
import { $exercisesRegistry } from '@features/exercises'

import { $registry, removeWorkout } from '../../model/workout'
import { $sets, createSet, loadSets, removeSet, updateSet } from '../../model/set'
import { history } from '@lib/routing'

export const pageMounted = createEvent()
export const pageUnmounted = createEvent()

export const weightChanged = createEvent()
export const repsChanged = createEvent()

export const exerciseSelected = createEvent()
export const setSelected = createEvent()

export const createSetClicked = createEvent()
export const updateSetClicked = createEvent()
export const removeSetClicked = createEvent()
export const resetClicked = createEvent()

export const removeWorkoutClicked = createEvent()

export const $workoutId = createStore(null)

export const $weight = createStore(0)
export const $reps = createStore(1)

export const $selectedExercise = createStore(null)
export const $selectedSet = createStore(null)

export const $repsValues = createStore(range(1, 50, 1))
export const $weightValues = createStore(range(0, 200, 2.5))

export const $setIsEditting = $selectedSet.map(Boolean)
export const $setsIds = createStore([])

// we need to reset sets store before open workout page
// temp solution
$sets.reset(pageUnmounted)

export const $workout = combine(
  $registry,
  $workoutId,
  (workouts, workoutId) => workouts[workoutId],
)

$workout.watch((workout) => {
  if (workout && workout.id) {
    loadSets(workout.id)
  }
})

export const $workoutExercises = combine(
  $workout,
  $exercisesRegistry,
  (workout, exercises) =>
    workout
      ? workout.exercises.map((exId) => exercises[exId])
      : [],
)

export const $exercisesSets = combine(
  $workoutExercises,
  $sets,
  (exercises, sets) =>
    exercises.map((exercise) => ({
      ...exercise,
      sets: objectFilter(sets, (set) => set.exerciseId === exercise.id),
    })),
)

export const $setData = combine(
  $selectedSet,
  $sets,
  (setId, sets) => sets[setId],
)

$setData.watch((setData) => {
  if (setData) {
    weightChanged(Number(setData.weight))
    repsChanged(setData.reps)
  }
})

const $setDetails = createStoreObject({
  workoutId: $workoutId,
  exerciseId: $selectedExercise,
  setId: $selectedSet,
  reps: $reps,
  weight: $weight,
})

sample(
  $setDetails,
  createSetClicked,
).watch(({ workoutId, exerciseId, reps, weight }) => {
  createSet({
    workoutId,
    setData: { reps, weight, exerciseId },
  })
})

sample(
  $setDetails,
  updateSetClicked,
).watch(({ workoutId, exerciseId, setId, weight, reps }) => {
  updateSet({
    workoutId,
    setId,
    setData: { reps, weight, exerciseId },
  })
})

sample(
  $setDetails,
  removeSetClicked,
).watch(({ workoutId, setId }) => {
  removeSet({ workoutId, setId })
})

$workoutId.on(pageMounted, (_, workoutId) => workoutId)

$weight
  .reset(resetClicked)
  .on(weightChanged, (_, weight) => weight)

$reps
  .reset(resetClicked)
  .on(repsChanged, (_, reps) => reps)

$selectedExercise
  .on(exerciseSelected, (_, { exerciseId }) => exerciseId)
  .on(setSelected, (_, { exerciseId }) => exerciseId)

$selectedSet
  .reset(exerciseSelected, removeSet)
  .on(setSelected, (_, { setId }) => setId)

sample(
  $workoutId,
  removeWorkoutClicked,
).watch((workoutId) => {
  removeWorkout(workoutId)
})

removeWorkout.done.watch(() => {
  history.push('/workout')
})
