import React from 'react'
import dayjs from 'dayjs'
import { useStore } from 'effector-react'
import { Button, Card } from 'antd'

import { Row, Text } from '@ui'
import { $session, Authenticated, Header, MainTemplate } from '@features/common'

import { logoutPressed } from './model'

export const AccountPage = () => {
  const account = useStore($session)

  return (
    <Authenticated
      render={() => (
        <MainTemplate header={PageHeader}>
          <Row padding="0.5rem">
            <Card title="General information">
              <div>
                <Text strong>User name:</Text>{' '}
                {account.name || 'Empty'}
              </div>
              <div>
                <Text strong>User email:</Text>{' '}
                {account.email}
              </div>
              <div>
                <Text strong>Date created:</Text>{' '}
                {dayjs(account.createdAt).format('DD-MM-YYYY HH:mm')}
              </div>
            </Card>
          </Row>
        </MainTemplate>
      )}
    />
  )
}

const PageHeader = (
  <Header>
    <span>Profile</span>
    <Button size="large" onClick={logoutPressed}>
      Log out
    </Button>
  </Header>
)
