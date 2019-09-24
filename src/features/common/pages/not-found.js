import React from 'react'
import { Card } from 'antd'
import { CenterContent, H2, Row, Text } from '@ui'
import { MainTemplate } from '../templates/main-template'

export const NotFoundPage = () => (
  <MainTemplate>
    <Row padding="0.5rem">
      <Card>
        <CenterContent>
          <H2>404 :-(</H2>
          <Text>Page not found</Text>
        </CenterContent>
      </Card>
    </Row>
  </MainTemplate>
)
