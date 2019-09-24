import React from 'react'
import styled from 'styled-components'
import { Layout } from 'antd'
import { Navigation } from '../layout/navigation'
import { FixedFooter } from '../layout/fixed-footer'
import { menuItems } from '../menu-config'

export const MainTemplate = ({
  children,
  header = null,
  layout: PageLayout = FullScreenLayout,
}) => (
  <PageLayout>
    {header}
    <Content>{children}</Content>
    <FixedFooter>
      <Navigation menuItems={menuItems} />
    </FixedFooter>
  </PageLayout>
)

export const FullScreenLayout = styled(Layout)`
  min-height: 100vh;
  padding-bottom: 64px;
`

export const Content = styled(Layout.Content)``
