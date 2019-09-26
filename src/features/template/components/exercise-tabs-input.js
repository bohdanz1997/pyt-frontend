import React from 'react'
import { Form, Tree, List } from 'antd'
import { FormError, Tabs } from '@ui'

export const ExerciseTabsInput = ({
  name,
  label,
  options: groupsExercises,
  error,
  onChange,
  onBlur,
}) => {
  const handleSelect = (selectedKeys) => {
    const exerciseIds = selectedKeys.map((key) => Number(key.split('-')[1]))
    onChange(name, exerciseIds)
  }
  const handleBlur = () => {
    onBlur(name, true)
  }

  return (
    <Form.Item
      className={error && 'has-error'}
      label={label}
    >
      {(error) && (
        <FormError>{error}</FormError>
      )}
      <Tabs
        tabs={groupsExercises.map((group) => ({
          key: group.id,
          title: group.name,
          renderContent: () => (
            <Tree
              multiple
              onSelect={handleSelect}
              onBlur={handleBlur}
            >
              {group.exercises.map((exercise) => (
                <Tree.TreeNode
                  key={`${group.id}-${exercise.id}`}
                  title={exercise.name}
                />
              ))}
            </Tree>
          ),
        }))}
      />
    </Form.Item>
  )
}
