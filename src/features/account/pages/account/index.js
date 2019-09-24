import React, { useEffect } from 'react'
import dayjs from 'dayjs'
import { useStore } from 'effector-react'
import { Button, Card } from 'antd'

import { history } from '@lib/routing'
import { Row, Text } from '@ui'
import { $isAuthenticated, $session, Header, MainTemplate } from '@features/common'

import { logoutPressed } from './model'

const useRedirect = (condition, redirectTo) => {
  useEffect(() => {
    if (condition) {
      history.push(redirectTo)
    }
  }, [condition, redirectTo])
}

export const AccountPage = () => {
  const isAuthenticated = useStore($isAuthenticated)
  const account = useStore($session)

  useRedirect(!isAuthenticated, '/login')

  return (
    <MainTemplate
      header={
        <Header>
          <span>Profile</span>
          <Button size="large" onClick={logoutPressed}>
            Log out
          </Button>
        </Header>
      }
    >
      <Row padding="0.5rem">
        <Card title="General information">
          <div>
            <Text strong>User name:</Text> {account.name || 'Empty'}
          </div>
          <div>
            <Text strong>User email:</Text> {account.email}
          </div>
          <div>
            <Text strong>Date created:</Text> {dayjs(account.createdAt).format('DD-MM-YYYY HH:mm')}
          </div>
        </Card>
      </Row>
    </MainTemplate>
  )
}
