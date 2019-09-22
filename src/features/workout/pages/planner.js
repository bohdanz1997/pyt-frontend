import React, { useState } from 'react'
import dayjs from 'dayjs'
import styled from 'styled-components'
import { Calendar, notification } from 'antd'
import { useStore } from 'effector-react'
import * as colors from '@ant-design/colors/lib'

import { history } from '@lib/routing'
import { objectFind } from '@lib/object'
import { useModal } from '@lib/hooks'
import { MainTemplate } from '@features/common'
import { mapApiError } from '@features/common/lib'
import { $templates } from '@features/template'

import { $registry, createWorkout } from '../model/workout'
import { CreateWorkoutModal } from '../components/create-workout-modal'

const mapCreateWorkoutApiError = mapApiError({
  template_not_found: 'A template was not found',
  workout_already_created: 'A workout is already created for selected date',
})

export const WorkoutPlannerPage = () => {
  const workouts = useStore($registry)
  const templates = useStore($templates)
  const [selectedDate, setSelectedDate] = useState(null)
  const createModal = useModal()

  const workoutByDate = (date) => objectFind(
    workouts,
    (workout) => dayjs(workout.createdAt).isSame(date, 'day')
  )

  const onDateSelect = (date) => {
    const workout = workoutByDate(date.toDate())

    if (workout) {
      history.push(`/workout/${workout.id}`)
    } else {
      setSelectedDate(date.toDate())
      createModal.open()
    }
  }

  const workoutCreate = async (templateId) => {
    createModal.close()
    const date = selectedDate || undefined
    try {
      await createWorkout({
        templateId,
        date,
      })
    } catch (err) {
      notification.error({
        placement: 'bottomLeft',
        duration: 3,
        message: mapCreateWorkoutApiError(err.error),
      })
    }
  }

  return (
    <MainTemplate>
      <Calendar
        style={{ background: '#fff' }}
        dateFullCellRender={(date) => (
          <div className="ant-fullcalendar-date">
            <WorkoutCell
              className="ant-fullcalendar-value"
              busy={Boolean(workoutByDate(date.toDate()))}
            >
              {date.date()}
            </WorkoutCell>
          </div>
        )}
        fullscreen={false}
        onChange={onDateSelect}
      />
      <CreateWorkoutModal
        visible={createModal.visible}
        templates={templates}
        onCancel={createModal.close}
        onSubmit={workoutCreate}
      />
    </MainTemplate>
  )
}

const WorkoutCell = styled.div`
  background: ${({ busy }) => busy ? colors.blue[1] : 'initial'};
`
