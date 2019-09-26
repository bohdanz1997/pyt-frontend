import React, { useState } from 'react'
import dayjs from 'dayjs'
import styled from 'styled-components'
import { Calendar, notification } from 'antd'
import { useStore } from 'effector-react'
import * as colors from '@ant-design/colors/lib'

import { history } from '@lib/routing'
import { objectFind, toSelectOption } from '@lib/object'
import { useModal } from '@lib/hooks'
import { Authenticated, MainTemplate } from '@features/common'
import { mapApiError } from '@features/common/lib'
import { $templates } from '@features/template'

import { $registry, createWorkout } from '../model/workout'
import { CreateWorkoutModal } from '../components/create-workout-modal'

const mapCreateWorkoutApiError = mapApiError({
  template_not_found: 'A template was not found',
  workout_already_created: 'A workout is already created for selected date',
})

const $templateOptions = $templates.map((templates) => (
  templates.map(toSelectOption('name', 'id'))
))

export const WorkoutPlannerPage = () => {
  const workouts = useStore($registry)
  const templateOptions = useStore($templateOptions)
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
    setSelectedDate(null)

    try {
      const { result } = await createWorkout({
        templateId,
        date,
      })
      history.push(`/workout/${result.id}`)
    } catch (err) {
      notification.error({
        placement: 'bottomLeft',
        duration: 3,
        message: mapCreateWorkoutApiError(err.error),
      })
    }
  }

  return (
    <Authenticated
      render={() => (
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
            onSelect={onDateSelect}
          />
          <CreateWorkoutModal
            visible={createModal.visible}
            templateOptions={templateOptions}
            onCancel={createModal.close}
            onSubmit={workoutCreate}
          />
        </MainTemplate>
      )}
    />
  )
}

const WorkoutCell = styled.div`
  background: ${({ busy }) => busy ? colors.blue[1] : 'initial'};
`
