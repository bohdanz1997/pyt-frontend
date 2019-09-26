import React from 'react'
import * as P from 'prop-types'
import styled from 'styled-components'
import { Icon, Layout } from 'antd'
import { history } from '@lib/routing'

export const Header = styled(Layout.Header)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  padding: 0 1rem;
  font-size: 20px;
  font-weight: bold;
  height: 52px;
`

Header.propTypes = {
  strong: P.bool,
}

export const FixedHeader = styled(Header)`
  position: fixed;
  top: 0;
  z-index: 1;
  width: 100%;
`

export const NavBackHeader = ({ text }) => (
  <Header>
    <span>
      <Icon type="arrow-left" onClick={() => history.goBack()} />
      <span style={{ marginLeft: 16, fontWeight: 'bold' }}>{text}</span>
    </span>
  </Header>
)
