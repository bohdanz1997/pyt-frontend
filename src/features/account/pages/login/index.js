import React from 'react'
import * as yup from 'yup'
import { Button, Card, Form } from 'antd'
import { Formik } from 'formik'

import { ErrorBox, FormInput, FormPassword, PrimaryButton, Row } from '@ui'
import { Header, MainTemplate, mapApiError, tokenChanged } from '@features/common'
import { sessionApi } from '@features/account/api'
import { history } from '@lib/routing'
import { Link } from 'react-router-dom'

export const LoginPage = () => (
  <MainTemplate
    header={<Header>Login</Header>}
    footer={null}
  >
    <Row padding="0.5rem">
      <Card>
        <LoginForm />
      </Card>
    </Row>
  </MainTemplate>
)

const LoginForm = () => (
  <Formik
    initialValues={{
      email: '',
      password: '',
    }}
    initialStatus={{
      formError: null,
    }}
    validationSchema={schema}
    onSubmit={handleSubmit}
  >
    {({
      values,
      errors,
      touched,
      handleChange,
      handleBlur,
      handleSubmit,
      isSubmitting,
      status: { formError },
    }) => (
      <Form onSubmit={handleSubmit}>
        {formError && (
          <ErrorBox>
            {mapServerToClientError(formError.error)}
          </ErrorBox>
        )}
        <FormInput
          name="email"
          type="email"
          label="Email"
          autoComplete="email"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.email}
          error={touched.email && errors.email}
        />
        <FormPassword
          name="password"
          label="Password"
          autoComplete="password"
          onChange={handleChange}
          value={values.password}
          error={touched.password && errors.password}
        />
        <Row gap="1rem">
          <PrimaryButton disabled={isSubmitting}>
            Sign in
          </PrimaryButton>
          <Link to="/register">
            <Button size="large">Register</Button>
          </Link>
        </Row>
      </Form>
    )}
  </Formik>
)

const schema = yup.object().shape({
  email: yup.string()
    .email()
    .required(),
  password: yup.string()
    .min(4)
    .required(),
})

const handleSubmit = async (values, { setSubmitting, setStatus }) => {
  try {
    const { result } = await sessionApi.createSession(values)

    tokenChanged(result.token)
    setSubmitting(false)
    history.push('/workout')
  } catch (err) {
    setStatus({
      formError: err.response.data,
    })
    setSubmitting(false)
  }
}

const mapServerToClientError = mapApiError({
  user_not_found: 'User with this email not exist',
  bad_credentials: 'Wrong password or email',
})
