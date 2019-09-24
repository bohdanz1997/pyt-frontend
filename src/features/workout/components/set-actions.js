import React from 'react'
import { Button } from 'antd'
import styled from 'styled-components'

export const SetActions = ({ disabled, actions }) => (
  <ActionsBlock>
    {actions.map(({ onClick, text }, index) => (
      <Button
        block
        size="large"
        key={index}
        onClick={onClick}
        disabled={disabled}
      >
        {text}
      </Button>
    ))}
  </ActionsBlock>
)

const ActionsBlock = styled.div`
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
