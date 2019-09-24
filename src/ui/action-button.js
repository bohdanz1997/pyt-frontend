import styled, { css } from 'styled-components'
import { Button } from 'antd'
import React from 'react'

const InnerButton = styled(({ size, ...props }) => <Button {...props} />)`
  font-weight: bold;

  ${(p) => p.size === 'normal' && css`
    width: 3.75rem;
    height: 3.75rem;
    font-size: 26px;
  `}

  ${(p) => p.size === 'small' && css`
    width: 3rem;
    height: 3rem;
    font-size: 20px;
  `}
`

export const ActionButton = ({ icon, loading, onClick, size = 'normal' }) => (
  <InnerButton
    shape="circle"
    type="primary"
    icon={icon}
    loading={loading}
    onClick={onClick}
    size={size}
  />
)

export const FixedBottom = styled.div`
  position: fixed;
  bottom: 80px;
  right: 16px;
`
