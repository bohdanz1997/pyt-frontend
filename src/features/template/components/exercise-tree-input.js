import React from 'react'
import { Form, Tree } from 'antd'
import { FormError } from '@ui'

export const ExerciseTreeInput = ({
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
      <Tree
        multiple
        expandedKeys={groupsExercises.map((g) => String(g.id))}
        onSelect={handleSelect}
        onBlur={handleBlur}
      >
        {groupsExercises
          .map((group) => (
            <Tree.TreeNode
              key={group.id}
              title={group.name}
              selectable={false}
            >
              {group.exercises.map((exercise) => (
                <Tree.TreeNode
                  key={`${group.id}-${exercise.id}`}
                  title={exercise.name}
                />
              ))}
            </Tree.TreeNode>
          ))}
      </Tree>
    </Form.Item>
  )
}
