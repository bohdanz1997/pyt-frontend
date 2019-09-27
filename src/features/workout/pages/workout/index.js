import React, { useEffect, useMemo, useState } from 'react'
import { Card } from 'antd'
import styled from 'styled-components'
import { useStore } from 'effector-react'

import { ActionButton, Col, FixedActions, Row, Text } from '@ui'
import { range } from '@lib/array'
import { Authenticated, MainTemplate } from '@features/common'

import { $exercisesSets, $workout, pageMounted } from './model'
import { $sets, createSet, removeSet, updateSet } from '../../model/set'
import { NumberPicker } from '../../components/number-picker'
import { ExercisesSetsTree } from '../../components/exercises-sets-tree'
import { SetActions } from '../../components/set-actions'
import { removeWorkout } from '@features/workout/model/workout'
import { history } from '@lib/routing'

export const WorkoutPage = ({ match }) => {
  const id = Number(match.params.id)

  useEffect(() => {
    pageMounted(id)
  }, [id])

  return (
    <Authenticated
      render={() => (
        <MainTemplate>
          <Editor />
        </MainTemplate>
      )}
    />
  )
}

const Editor = () => {
  const sets = useStore($sets)
  const workout = useStore($workout)
  const exercisesSets = useStore($exercisesSets)

  const repsValues = useMemo(() => range(1, 50, 1), [])
  const weightValues = useMemo(() => range(0, 200, 2.5), [])

  const [reps, setReps] = useState(1)
  const [weight, setWeight] = useState(0)
  const [selectedExercise, setSelectedExercise] = useState(null)
  const [selectedSet, setSelectedSet] = useState(null)

  const isEditting = Boolean(selectedSet)
  console.log(selectedExercise, selectedSet)

  const selectExercise = (exerciseId) => {
    if (setSelectedExercise === exerciseId) return

    setSelectedSet(null)
    setSelectedExercise(exerciseId)
  }

  const selectSet = (setId, exerciseId) => {
    if (selectedSet === setId) return

    const setData = sets.find((s) => s.id === setId)
    setSelectedSet(setId)
    setSelectedExercise(exerciseId)

    setReps(setData.reps)
    setWeight(Number(setData.weight))
  }

  const setCreate = () => {
    createSet({
      workoutId: workout.id,
      setData: {
        reps,
        weight,
        exerciseId: selectedExercise,
      },
    })
  }

  const setUpdate = () => {
    updateSet({
      workoutId: workout.id,
      setId: selectedSet,
      setData: {
        reps,
        weight,
      },
    })
  }

  const setRemove = () => {
    removeSet({
      workoutId: workout.id,
      setId: selectedSet,
    })
    setSelectedSet(null)
  }

  const workoutDelete = async () => {
    await removeWorkout(workout.id)
    history.push('/workout')
  }

  const resetState = () => {
    setReps(1)
    setWeight(0)
  }

  return (
    <>
      <ActionsCard bodyStyle={{ padding: 12 }}>
        <Row style={{ textAlign: 'center' }}>
          <Col span={12}>
            <Text strong>Повтори</Text>
            <NumberPicker
              disabled={!selectedExercise}
              values={repsValues}
              selectedValue={reps}
              onChange={setReps}
            />
          </Col>
          <Col span={12}>
            <Text strong>Вага (кг)</Text>
            <NumberPicker
              disabled={!selectedExercise}
              values={weightValues}
              selectedValue={weight}
              onChange={setWeight}
            />
          </Col>
        </Row>
        <Row>
          {isEditting ? (
            <SetActions
              actions={[
                { text: 'Оновити', onClick: setUpdate },
                { text: 'Видалити', onClick: setRemove },
              ]}
            />
          ) : (
            <SetActions
              disabled={!selectedExercise}
              actions={[
                { text: 'Створити', onClick: setCreate },
                { text: 'Скинути', onClick: resetState },
              ]}
            />
          )}
        </Row>
      </ActionsCard>
      <ExercisesSetsCard bodyStyle={{ padding: 12 }}>
        <ExercisesSetsTree
          exercisesSets={exercisesSets}
          onSelectExercise={selectExercise}
          onSelectSet={selectSet}
        />
      </ExercisesSetsCard>
      <WorkoutActions
        onDeleteClick={workoutDelete}
        onEditExercisesClick={() => {}}
      />
    </>
  )
}

const WorkoutActions = ({ onDeleteClick, onEditExercisesClick }) => (
  <FixedActions
    actions={[
      { title: 'Редагувати список вправ', icon: 'file', onClick: onEditExercisesClick },
      { title: 'Видалити тренування', icon: 'delete', onClick: onDeleteClick },
    ]}
  />
)

const ActionsCard = styled(Card)`
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1;
`

const ExercisesSetsCard = styled(Card)`
  margin-top: 245px !important;
`
