import React from 'react'
import { Tree } from 'antd'

export const ExercisesSetsTree = ({
  exercisesSets,
  onChange,
}) => {
  const handleSelect = (selectedKeys) => {
    // const exerciseIds = selectedKeys.map((key) => Number(key.split('-')[1]))
    // onChange(exerciseIds)
  }

  return (
    <Tree
      expandedKeys={exercisesSets.map((g) => String(g.id))}
      onSelect={handleSelect}
    >
      {exercisesSets
        .map((exercise) => (
          <Tree.TreeNode
            key={exercise.id}
            title={exercise.name}
            selectable={false}
          >
            {exercise.sets.map((set) => (
              <Tree.TreeNode
                key={`${set.id}-${set.id}`}
                title={`${set.reps} раз / ${set.weight} кг`}
              />
            ))}
          </Tree.TreeNode>
        ))}
    </Tree>
  )
}
