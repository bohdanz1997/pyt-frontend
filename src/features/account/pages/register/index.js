import React from 'react'
import { Formik } from 'formik'
import * as yup from 'yup'
import { Button, Form } from 'antd'
import { history } from '@lib/routing'
import { Header, MainTemplate, mapApiError, tokenChanged } from '@features/common'
import { Card, ErrorBox, FormInput, FormPassword, PrimaryButton, Row } from '@ui'
import { accountApi, sessionApi } from '../../api'
import { Link } from 'react-router-dom'

export const RegisterPage = () => (
  <MainTemplate
    header={<Header>Registration</Header>}
    footer={null}
  >
    <Row padding="0.5rem">
      <Card>
        <RegisterForm />
      </Card>
    </Row>
  </MainTemplate>
)

const RegisterForm = () => (
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
            Sign up
          </PrimaryButton>
          <Link to="/login">
            <Button size="large">Login</Button>
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
    await accountApi.createAccount(values)
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
  email_already_exists: 'That email already exists.',
})
