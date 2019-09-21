import React, { useEffect } from 'react'
import styled from 'styled-components'
import { createEvent } from 'effector'
import { useStore } from 'effector-react'
import { Button, Card, Empty, Icon } from 'antd'
import { Link } from 'react-router-dom'
import { MainTemplate } from '@features/common'
import { $exercises } from '@features/exercises'
import { ActionButton, ConditionalList, Text } from '@ui'
import { $templates, loadTemplates, removeTemplate } from '../model'

const pageReady = createEvent()

pageReady.watch(() => {
  loadTemplates()
})

export const TemplateListPage = () => {
  const templates = useStore($templates)
  const exercises = useStore($exercises)

  useEffect(() => {
    pageReady()
  }, [])

  return (
    <MainTemplate>
      <ConditionalList
        list={templates}
        renderEmpty={NoTemplates}
        renderExists={() => (
          <TemplateList
            templates={templates}
            exercises={exercises}
            onDeleteClick={removeTemplate}
          />
        )}
      />
      <Link to="/templates/create">
        <ActionButton icon="plus" />
      </Link>
    </MainTemplate>
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
          const exercise = exercises.find((ex) => ex.id === exId) || {}
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
