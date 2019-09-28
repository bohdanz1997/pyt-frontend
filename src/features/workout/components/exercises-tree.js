import React from 'react'
import { Button, Tree } from 'antd'
import styled from 'styled-components'
import './exercises-sets-tree.css'

export const ExercisesTree = ({
  exercises,
  onSelectExercise,
}) => {
  const handleSelect = (selectedKeys) => {
    if (!selectedKeys.length) return onSelectExercise(null)

    const exercise = selectedKeys[0]
    onSelectExercise(Number(exercise))
  }

  return (
    <Tree
      onSelect={handleSelect}
      className="ex-tree"
    >
      {exercises.map((exercise, index) => (
        <Tree.TreeNode
          key={exercise.id}
          title={(
            <div>
              <span>
                {index + 1}. {exercise.name}
              </span>
              <span>
                <Button icon="edit" />
                <Button icon="close" />
              </span>
            </div>
          )}
        >
        </Tree.TreeNode>
      ))}
      <Tree.TreeNode
        key={-1}
        title={<Button icon="plus">Додати вправу</Button>}
      />
    </Tree>
  )
}
