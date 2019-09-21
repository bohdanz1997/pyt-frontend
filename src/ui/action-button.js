import styled, { css } from 'styled-components'
import { Button } from 'antd'
import React from 'react'

const InnerButton = styled(Button)`
  width: 3.75rem;
  height: 3.75rem;
  font-size: 26px;
  font-weight: bold;
  position: fixed;
  bottom: 80px;
  right: 16px;
  
  ${({ loading }) => loading && css`
    position: fixed !important;
  `}
`

export const ActionButton = ({ icon, loading, onClick }) => (
  <InnerButton
    shape="circle"
    type="primary"
    icon={icon}
    loading={loading}
    onClick={onClick}
  />
)
