import React from 'react'
import { Tree } from 'antd'
import styled from 'styled-components'
import './exercises-sets-tree.css'

export const ExercisesSetsTree = ({
  exercisesSets,
  onSelectSet,
  onSelectExercise,
}) => {
  const handleSelect = (selectedKeys) => {
    if (!selectedKeys.length) return onSelectExercise(null)

    const [exercise, set] = selectedKeys[0].split('-')
    if (set) {
      return onSelectSet(Number(set), Number(exercise))
    }
    onSelectExercise(Number(exercise))
  }

  return (
    <Tree
      expandedKeys={exercisesSets.map((g) => String(g.id))}
      onSelect={handleSelect}
      className="ex-tree"
    >
      {exercisesSets
        .map((exercise, index) => (
          <Tree.TreeNode
            key={exercise.id}
            title={`${index + 1}. ${exercise.name} (${exercise.sets.length})`}
          >
            {exercise.sets.map((set) => (
              <Tree.TreeNode
                key={`${exercise.id}-${set.id}`}
                title={
                  <SetTitle>
                    <span>{Number(set.weight).toFixed(1)}кг</span>
                    <span>x{set.reps}</span>
                  </SetTitle>
                }
              />
            ))}
          </Tree.TreeNode>
        ))}
    </Tree>
  )
}

const SetTitle = styled.span`
  display: flex;
  flex-direction: column;
  align-items: center;
`
