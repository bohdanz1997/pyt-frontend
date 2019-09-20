import React from 'react'
import styled from 'styled-components'
import { Layout } from 'antd'
import { Navigation } from '../layout/navigation'
import { FixedFooter } from '../layout/fixed-footer'
import { menuItems } from '../menu-config'

export const MainTemplate = ({ children, header }) => (
  <FullScreenLayout>
    <Header>
      <Title>Plan your training</Title>
    </Header>
    <Content>{children}</Content>
    <FixedFooter>
      <Navigation menuItems={menuItems} />
    </FixedFooter>
  </FullScreenLayout>
)

const Title = styled.span`
  font-size: 20px;
  font-weight: bold;
`

const FullScreenLayout = styled(Layout)`
  min-height: 100vh;
`

const Header = styled(Layout.Header)`
  background: #fff;
  padding: 0 20px;
`

const Content = styled(Layout.Content)`
  padding: 10px;
`
