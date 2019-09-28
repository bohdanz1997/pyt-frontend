import React, { useEffect } from 'react'
import { Card } from 'antd'
import styled from 'styled-components'
import { useStore } from 'effector-react'

import { Col, FixedActions, Row, Text } from '@ui'
import { Authenticated, MainTemplate } from '@features/common'

import { NumberPicker } from '../../components/number-picker'
import { SetActions } from '../../components/set-actions'
import { ExercisesSetsTree } from '../../components/exercises-sets-tree'
import { ExercisesTree } from '../../components/exercises-tree'
import {
  $exercisesSets,
  $reps,
  $repsValues,
  $selectedExercise,
  $setIsEditting,
  $weight,
  $weightValues,
  $workoutExercises,
  createSetClicked,
  exerciseSelected,
  pageMounted, pageUnmounted,
  removeSetClicked,
  removeWorkoutClicked,
  repsChanged,
  resetClicked,
  setSelected,
  updateSetClicked,
  weightChanged,
} from './model'

export const WorkoutPage = ({ match }) => {
  const id = Number(match.params.id)

  useEffect(() => {
    pageMounted(id)
    return () => pageUnmounted()
  }, [id])

  return (
    <Authenticated
      render={() => (
        <MainTemplate>
          <Workout />
        </MainTemplate>
      )}
    />
  )
}

const Workout = () => (
  <Container>
    <SetsCard>
      <SetsEditor />
      <SetEditorActions />
    </SetsCard>
    <ExercisesSetsCard>
      <ExercisesSetsEditor />
    </ExercisesSetsCard>
    <Actions
      onDeleteClick={removeWorkoutClicked}
      onEditExercisesClick={() => {}}
    />
  </Container>
)

const SetsEditor = () => {
  const reps = useStore($reps)
  const weight = useStore($weight)
  const repsValues = useStore($repsValues)
  const weightValues = useStore($weightValues)
  const selectedExercise = useStore($selectedExercise)

  return (
    <Row style={{ textAlign: 'center' }}>
      <Col span={12}>
        <Text strong>Вага (кг)</Text>
        <NumberPicker
          disabled={!selectedExercise}
          values={weightValues}
          selectedValue={weight}
          onChange={weightChanged}
        />
      </Col>
      <Col span={12}>
        <Text strong>Повтори</Text>
        <NumberPicker
          disabled={!selectedExercise}
          values={repsValues}
          selectedValue={reps}
          onChange={repsChanged}
        />
      </Col>
    </Row>
  )
}

const SetEditorActions = () => {
  const setIsEditting = useStore($setIsEditting)
  const selectedExercise = useStore($selectedExercise)

  return (
    <Row>
      {setIsEditting ? (
        <SetActions
          actions={[
            { text: 'Оновити', onClick: updateSetClicked },
            { text: 'Видалити', onClick: removeSetClicked },
          ]}
        />
      ) : (
        <SetActions
          disabled={!selectedExercise}
          actions={[
            { text: 'Створити', onClick: createSetClicked },
            { text: 'Скинути', onClick: resetClicked },
          ]}
        />
      )}
    </Row>
  )
}

const ExercisesSetsEditor = () => {
  const isExercisesEditting = false
  const exercisesSets = useStore($exercisesSets)
  const exercises = useStore($workoutExercises)

  return isExercisesEditting ? (
    <ExercisesTree
      onSelectExercise={() => {}}
      exercises={exercises}
    />
  ) : (
    <ExercisesSetsTree
      exercisesSets={exercisesSets}
      onSelectExercise={exerciseSelected}
      onSelectSet={setSelected}
    />
  )
}

const Actions = ({ onDeleteClick, onEditExercisesClick }) => (
  <FixedActions
    actions={[
      { title: 'Редагувати список вправ', icon: 'file', onClick: onEditExercisesClick },
      { title: 'Видалити тренування', icon: 'delete', onClick: onDeleteClick },
    ]}
  />
)

const Container = styled.div`
  padding-bottom: 75px;
`

const SetsCard = styled(Card)`
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1;
  
  & > div {
    padding: 0.75rem;
  }
`

const ExercisesSetsCard = styled(Card)`
  margin-top: 245px !important;
  
  & > div {
    padding: 0.75rem;
  }
`
