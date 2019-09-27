import React, { useState } from 'react'
import styled from 'styled-components'

import { Col } from './layout'
import { ActionButton } from './action-button'

export const FixedActions = ({ actions, renderButton }) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleOpen = () => {
    setIsOpen(!isOpen)
  }

  return (
    <FixedContainer>
      <Col gap="0.5rem">
        {isOpen && <ActionButtons actions={actions} /> }
        {renderButton ? renderButton({ isOpen, toggleOpen }) : (
          <ActionButton icon={isOpen ? 'close' : 'edit'} onClick={toggleOpen} />
        )}
      </Col>
    </FixedContainer>
  )
}

const ActionButtons = ({ actions }) => (
  <>
    {actions.map((action, index) => (
      <Action key={index}>
        {action.title && (
          <ActionText onClick={action.onClick}>
            {action.title}
          </ActionText>
        )}
        <ActionButton
          icon={action.icon}
          size="small"
          onClick={action.onClick}
        />
      </Action>
    ))}
  </>
)

const FixedContainer = styled.div`
  position: fixed;
  bottom: 80px;
  right: 16px;

  & > div {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`

const Action = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`

const ActionText = styled.span`
  position: absolute;
  right: 60px;
  text-align: right;
  font-weight: bold;
  white-space: nowrap;
  background-color: #fff;
  box-shadow: 1px 1px 2px #00000036;
  padding: 0.5rem;
  border-radius: 3px;
`
