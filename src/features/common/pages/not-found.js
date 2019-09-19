import React from 'react'
import { Card } from 'antd'
import { CenterContent, H2, Text } from '@ui'
import { MainTemplate } from '../templates/main-template'

export const NotFoundPage = () => (
  <MainTemplate>
    <Card>
      <CenterContent>
        <H2>404 :-(</H2>
        <Text>Page not found</Text>
      </CenterContent>
    </Card>
  </MainTemplate>
)
