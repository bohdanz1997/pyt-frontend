import React from 'react'
import styled from 'styled-components'
import { Layout } from 'antd'
import { Navigation } from '../layout/navigation'
import { FixedFooter } from '../layout/fixed-footer'
import { menuItems } from '../menu-config'

export const MainTemplate = ({ children }) => (
  <FullScreenLayout>
    <Header>NAVBAR</Header>
    <Content>{children}</Content>
    <FixedFooter>
      <Navigation menuItems={menuItems} />
    </FixedFooter>
  </FullScreenLayout>
)

const FullScreenLayout = styled(Layout)`
  min-height: 100vh;
`

const Header = styled(Layout.Header)`
  background: #fff;
`

const Content = styled(Layout.Content)`
  padding: 16px;
  height: 1000px;
`
