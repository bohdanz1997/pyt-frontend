import React from 'react'
import { Formik } from 'formik'
import * as yup from 'yup'
import { Form } from 'antd'
import { history } from '@lib/routing'
import { MainTemplate, Header, tokenChanged } from '@features/common'
import { Card, ErrorBox, FormInput, FormPassword, PrimaryButton } from '@ui'
import { accountApi, sessionApi } from '../api'

export const RegisterPage = () => (
  <MainTemplate header={<Header>Registration</Header>}>
    <Card>
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

const handleSubmit = async (values, { setSubmitting, setStatus }) => {
  try {
    await accountApi.createAccount(values)
    const { result } = await sessionApi.createSession(values)

    tokenChanged(result.token)
    history.push('/workout')
  } catch (err) {
    setStatus({
      formError: err.response.data,
    })
  }
  setSubmitting(false)
}

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
        <PrimaryButton disabled={isSubmitting}>
          Sign up
        </PrimaryButton>
      </Form>
    )}
  </Formik>
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