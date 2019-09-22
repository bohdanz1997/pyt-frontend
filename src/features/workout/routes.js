import { WorkoutPlannerPage } from './pages/planner'
import { WorkoutPage } from './pages/workout'

export const workoutRoutes = () => [
  {
    path: '/workout',
    exact: true,
    component: WorkoutPlannerPage,
  },
  {
    path: '/workout/:id',
    component: WorkoutPage,
  },
]
