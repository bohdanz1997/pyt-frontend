import React, { useState } from 'react'
import styled from 'styled-components'
import { Formik } from 'formik'
import * as yup from 'yup'
import { Button, Card, Form, Input } from 'antd'
import { history } from '@lib/routing'
import { MainTemplate, request } from '@features/common'

export const RegisterPage = () => (
  <MainTemplate>
    <Card title="Registration">
      <RegisterForm />
    </Card>
  </MainTemplate>
)

const schema = yup.object().shape({
  email: yup.string()
    .email()
    .required(),
  password: yup.string()
    .min(4)
    .required(),
})

const ErrorBox = styled.div`
  color: red;
`

const accountApi = {
  createAccount: (data) => request('POST', '/users', { data }),
}

const sessionApi = {
  createSession: (data) => request('POST', '/users/session', { data }),
}

const RegisterForm = () => {
  const [formError, setFormError] = useState(null)

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={schema}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          await accountApi.createAccount(values)
          const { result } = await sessionApi.createSession(values)

          console.log('token', result.token)
          history.push('/')
        } catch (err) {
          setFormError(err.response.data)
        }
        setSubmitting(false)
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
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
            autoComplete="email"
            label="Email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
            error={touched.email && errors.email}
          />
          <FormInput
            name="password"
            type="password"
            autoComplete="password"
            label="Password"
            onChange={handleChange}
            value={values.password}
            error={touched.password && errors.password}
          />
          <PrimaryButton disabled={isSubmitting}>
              Sign up
          </PrimaryButton>
        </Form>
      )}
    </Formik>
  )
}

const PrimaryButton = ({ disabled, children }) => (
  <Button type="primary" size="large" htmlType="submit" className="login-form-button" disabled={disabled}>
    {children}
  </Button>
)

const FormInput = ({ prefix, error, placeholder, type, name, label, autoComplete, disabled, onChange, value }) => (
  <Form.Item className={error && 'has-error'} label={label}>
    <Input
      prefix={prefix}
      placeholder={placeholder}
      type={type}
      name={name}
      autoComplete={autoComplete}
      disabled={disabled}
      onChange={onChange}
      value={value}
      size="large"
    />
    {(error) && (
      <div className="ant-form-explain">{error}</div>
    )}
  </Form.Item>
)

const mapServerToClientError = (error) => {
  switch (error) {
    case 'email_already_exists':
      return (
        <span>
          That email already exists.
        </span>
      )

    default:
      return 'Got an unexpected error. Try again later'
  }
}