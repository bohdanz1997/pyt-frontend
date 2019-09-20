import { request } from '@features/common'

export const workoutApi = {
  create: (templateId) =>
    request('POST', '/workouts', { data: { templateId } }),

  getList: () => request('GET', '/workouts'),

  addExercise: (workoutId, exerciseId) =>
    request('POST', `/workouts/${workoutId}/exercises`, { data: { exerciseId } }),

  removeExercise: (workoutId, exerciseId) =>
    request('DELETE', `/workouts/${workoutId}/exercises`, { data: { exerciseId } }),

  createSet: (workoutId, setData) =>
    request('POST', `/workouts/${workoutId}/sets`, { data: setData }),

  getSets: (workoutId) =>
    request('GET', `/workouts/${workoutId}/sets`),

  updateSet: (workoutId, setId, setData) =>
    request('PUT', `/workouts/${workoutId}/sets/${setId}`, { data: setData }),

  removeSet: (workoutId, setId) =>
    request('DELETE', `/workouts/${workoutId}/sets/${setId}`),
}
