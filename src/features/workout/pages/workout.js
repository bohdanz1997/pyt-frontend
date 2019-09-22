import React, { useEffect, useState } from 'react'
import { Button, Card, Spin } from 'antd'
import styled from 'styled-components'
import { createEvent } from 'effector'
import { useStore } from 'effector-react'

import { Col, Row, Text } from '@ui'
import { range } from '@lib/array'
import { MainTemplate } from '@features/common'
import { $exercises } from '@features/exercises'

import { $exercisesSets, $openedWorkout, workoutOpened } from '../model/workout'
import { NumberPicker } from '../components/number-picker'
import { ExercisesSetsTree } from '../components/exercises-sets-tree'

const pageReady = createEvent()

// pageReady.watch(() => {
// })

export const WorkoutPage = ({ match }) => {
  const id = Number(match.params.id)
  const workout = useStore($openedWorkout)

  useEffect(() => {
    workoutOpened({ workoutId: id })
  }, [id])

  return (
    <MainTemplate>
      <Col gap="0.5rem">
        {workout && (
          <Editor workout={workout} />
        )}
      </Col>
    </MainTemplate>
  )
}

const Editor = ({ workout }) => {
  const exercises = useStore($exercises)
  const exercisesSets = useStore($exercisesSets)

  const repsValues = range(1, 50, 1)
  const weightValues = range(0, 200, 2.5)

  const [reps, setReps] = useState(0)
  const [weight, setWeight] = useState(0)
  const [isEditting, setIsEditting] = useState(false)

  return (
    <>
      <Card bodyStyle={{ padding: 12 }}>
        <Row style={{ textAlign: 'center' }}>
          <Col span={12}>
            <Text strong>Повтори</Text>
            <NumberPicker
              values={repsValues}
              selectedValue={reps}
              onChange={setReps}
            />
          </Col>
          <Col span={12}>
            <Text strong>Вага (кг)</Text>
            <NumberPicker
              values={weightValues}
              selectedValue={weight}
              onChange={setWeight}
            />
          </Col>
        </Row>
        <Row>
          {isEditting ? (
            <ButtonsBlock>
              <Button block size="large">Оновити</Button>
              <Button block size="large">Видалити</Button>
            </ButtonsBlock>
          ) : (
            <ButtonsBlock>
              <Button block size="large">Створити</Button>
              <Button block size="large">Скинути</Button>
            </ButtonsBlock>
          )}
        </Row>
      </Card>
      <Card bodyStyle={{ padding: 12 }}>
        <ExercisesSetsTree
          exercisesSets={exercisesSets}
        />
      </Card>
    </>
  )
}

const NumberBlock = styled.div`
  display: flex;
`

const ButtonsBlock = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  
  & > button:first-child {
    margin-right: 0.25rem;
  }
  & > button:last-child {
    margin-left: 0.25rem;
  }
`
