import React from 'react'
import styled from 'styled-components'
import { useStore } from 'effector-react'
import { Card, Empty, Icon } from 'antd'
import { Link } from 'react-router-dom'

import { Authenticated, MainTemplate } from '@features/common'
import { $exercisesRegistry } from '@features/exercises'
import { ActionButton, ConditionalList, FixedBottom, Row, Text } from '@ui'
import { $templates, removeTemplate } from '../model'

export const TemplateListPage = () => {
  const templates = useStore($templates)
  const exercises = useStore($exercisesRegistry)

  return (
    <Authenticated
      render={() => (
        <MainTemplate>
          <Row padding="0.5rem">
            <ConditionalList
              list={templates}
              renderEmpty={NoTemplates}
              renderExists={(list) => (
                <TemplateList
                  templates={list}
                  exercises={exercises}
                  onDeleteClick={removeTemplate}
                />
              )}
            />
          </Row>
          <FixedBottom>
            <Link to="/templates/create">
              <ActionButton icon="plus" />
            </Link>
          </FixedBottom>
        </MainTemplate>
      )}
    />
  )
}

const TemplateList = ({ templates, exercises, onDeleteClick }) => (
  <ListContainer>
    {templates.map((template) => (
      <Card
        key={template.id}
        title={<TemplateCardTitle
          template={template}
          onDeleteClick={onDeleteClick}
        />}
      >
        <Text>{template.description}</Text>
        {template.exercises.map((exId) => {
          const exercise = exercises[exId]
          return (
            <Text key={exId}>
              {exercise.name}<br />
            </Text>
          )
        })}
      </Card>
    ))}
  </ListContainer>
)

const NoTemplates = () => (
  <Empty description="No templates" style={{ marginTop: 100 }} />
)

const TemplateCardTitle = ({ template, onDeleteClick }) => (
  <TitleBlock>
    <span>{template.name}</span>
    <Icon
      type="delete"
      style={{ color: 'red' }}
      onClick={() => onDeleteClick(template.id)}
    />
  </TitleBlock>
)

const TitleBlock = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 20px;
`

const ListContainer = styled.div`
  & > * {
    margin-bottom: 0.5rem;
  }
`
