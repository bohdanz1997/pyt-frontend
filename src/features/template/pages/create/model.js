import { combine } from 'effector'
import { $exercisesRegistry, $groupsRegistry } from '@features/exercises'
import { objectFilter, objectMap } from '@lib/object'

export const $groupsExercises = combine(
  $groupsRegistry,
  $exercisesRegistry,
  (groups, exercises) => (
    objectMap(groups, (group) => ({
      ...group,
      exercises: objectFilter(exercises, (ex) => ex.groupId === group.id),
    }))
  ),
)
