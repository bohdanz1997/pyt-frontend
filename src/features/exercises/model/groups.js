import { combine, createEffect, createStore } from 'effector'
import { groupsApi } from '../api'
import { $exercises } from './exercises'

export const loadGroups = createEffect()
export const $groups = createStore([])
export const $groupsExercises = combine(
  $groups,
  $exercises,
  (groups, exercises) => (
    groups.reduce((result, group) => [
      ...result,
      ({
        ...group,
        exercises: exercises.filter((ex) => ex.groupId === group.id),
      }),
    ], [])
  ),
)

loadGroups.use(() => groupsApi.getList())

$groups.on(loadGroups.done, (_, { result }) => result.result)
