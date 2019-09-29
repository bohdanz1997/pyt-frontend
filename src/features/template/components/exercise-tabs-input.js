import React from 'react'
import { Form, Tree } from 'antd'
import { useTabs } from '@lib/tabs'
import { FormError, Tab, TabPane, TabsContent, TabsNav } from '@ui'

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

  const { tabs } = useTabs(
    groupsExercises.map((group) => ({
      ...group,
      key: group.id,
      Title: group.name,
    })),
    groupsExercises.length ? groupsExercises[0].id: null,
  )

  return (
    <Form.Item
      className={error && 'has-error'}
      label={label}
    >
      {(error) && (
        <FormError>{error}</FormError>
      )}

      <TabsNav>
        {tabs.map((tab) => (
          <Tab {...tab.getTitleProps()}>
            {tab.render('Title')}
          </Tab>
        ))}
      </TabsNav>
      <TabsContent>
        {tabs.map((tab) => (
          <TabPane {...tab.getContentProps()}>
            <Tree
              multiple
              onSelect={handleSelect}
              onBlur={handleBlur}
            >
              {tab.origin.exercises.map((exercise) => (
                <Tree.TreeNode
                  key={`${tab.key}-${exercise.id}`}
                  title={exercise.name}
                />
              ))}
            </Tree>
          </TabPane>
        ))}
      </TabsContent>
    </Form.Item>
  )
}
