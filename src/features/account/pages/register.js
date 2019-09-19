import React, { useEffect } from 'react'
import { MainTemplate, request } from '@features/common'
import { Button, Card, Form, Icon, Input } from 'antd'

export const RegisterPage = () => {
  useEffect(
    () => {
      request('GET', '/groups').then(console.log)
    },
    [],
  )

  return (
    <MainTemplate>
      <Card title="Register">
        <RegisterForm />
      </Card>
    </MainTemplate>
  )
}

const RegisterForm = () => {
  const a = 0
  return (
    <Form onSubmit={() => {}}>
      <Form.Item>
        <Input
          prefix={<Icon type="user" />}
          placeholder="Email"
        />
      </Form.Item>
      <Form.Item>
        <Input
          prefix={<Icon type="lock" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Button type="primary" htmlType="submit" className="login-form-button">
        Sign in
      </Button>
    </Form>
  )
}
