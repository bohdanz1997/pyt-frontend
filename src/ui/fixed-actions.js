import React, { useState } from 'react'
import styled from 'styled-components'

import { Col } from './layout'
import { ActionButton } from './action-button'

export const FixedActions = ({ actions, renderButton }) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleOpen = () => {
    setIsOpen(!isOpen)
  }
  const close = () => {
    setIsOpen(false)
  }

  return (
    <FixedContainer>
      <Col gap="0.5rem">
        {isOpen && actions.map((action, index) => (
          <ActionButtonWrap
            key={index}
            title={action.title}
            icon={action.icon}
            onClick={action.onClick}
            onClose={close}
          />
        ))}
        {renderButton ? renderButton({ isOpen, toggleOpen }) : (
          <ActionButton icon={isOpen ? 'close' : 'edit'} onClick={toggleOpen} />
        )}
      </Col>
    </FixedContainer>
  )
}

const ActionButtonWrap = ({ title, icon, onClick, onClose }) => {
  const handleClick = () => {
    onClick()
    onClose()
  }

  return (
    <Action>
      {title && (
        <ActionText onClick={handleClick}>
          {title}
        </ActionText>
      )}
      <ActionButton
        icon={icon}
        size="small"
        onClick={handleClick}
      />
    </Action>
  )
}

const FixedContainer = styled.div`
  position: fixed;
  bottom: 62px;
  right: 10px;

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
