import React, { useEffect } from 'react'
import { MainTemplate, request } from '@features/common'
import { Button, Card, Form, Icon, Input } from 'antd'
import { useStore } from 'effector-react'
import { combine, createEffect, createEvent, createStore, createStoreObject, sample } from 'effector'
import { history } from '@lib/routing'
import { createFetching } from '@lib/fetching'

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

const emailChanged = createEvent()
const passwordChanged = createEvent()
const formSubmitted = createEvent()

const registerProcessing = createEffect()
const registerFetching = createFetching(registerProcessing)

const $email = createStore('')
const $emailError = $email.map((value) => {
  if (value.length === 0) return 'Please, enter email'
  return null
})
const $isEmailCorrect = $emailError.map(
  (value) => value === null,
)

const $password = createStore('')
const $passwordError = $password.map((value) => {
  if (value.length === 0) return 'Please, enter password'
  return null
})
const $isPasswordCorrect = $passwordError.map(
  (value) => value === null,
)

const $form = createStoreObject({
  email: $email,
  password: $password,
})

const $isFormValid = combine(
  $isEmailCorrect,
  $isPasswordCorrect,
  (isEmailCorrect, isPasswordCorrect) => isEmailCorrect && isPasswordCorrect,
)

const $isFormDisabled = registerFetching.isLoading
const $isSubmitEnabled = combine(
  $isFormValid,
  registerFetching.isLoading,
  (isFormValid, isregisterFetching) => isFormValid && !isregisterFetching,
)

const trimEvent = (event) => event.currentTarget.value.trim()

$email.on(emailChanged.map(trimEvent), (_, email) => email)
$password.on(passwordChanged.map(trimEvent), (_, password) => password)

// called after form submitted
sample(
  createStoreObject({
    isSubmitEnabled: $isSubmitEnabled,
    form: $form,
  }),
  formSubmitted,
).watch(({ isSubmitEnabled, form }) => {
  if (isSubmitEnabled) registerProcessing(form)
})

registerProcessing.use((form) =>
  request('POST', '/users', { data: form }).then(() =>
    request('POST', '/users/session', { data: form })
  )
)

registerProcessing.done.watch(({ result }) => {
  history.push('/')
})

const handleSubmit = (event) => {
  event.preventDefault()
  formSubmitted()
}

const RegisterForm = () => {
  const form = useStore($form)
  const formError = useStore(registerFetching.error)
  const isSubmitEnabled = useStore($isSubmitEnabled)

  return (
    <Form onSubmit={handleSubmit}>
      {formError && (
        <div>{mapServerToClientError(formError.error)}</div>
      )}
      <Email />
      <Password />
      <PrimaryButton disabled={!isSubmitEnabled}>
        Sign up
      </PrimaryButton>
    </Form>
  )
}

const PrimaryButton = ({ disabled, children }) => (
  <Button type="primary" size="large" htmlType="submit" className="login-form-button" disabled={disabled}>
    {children}
  </Button>
)

const FormInput = ({ prefix, error, placeholder, type, name, label, autoComplete, disabled, onChange, value }) => (
  <>
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
    </Form.Item>
    {(error) && (
      <div className="ant-form-explain">{error}</div>
    )}
  </>
)

const Email = () => {
  const email = useStore($email)
  const emailError = useStore($emailError)

  return (
    <FormInput
      name="email"
      type="email"
      autoComplete="email"
      label="Email"
      onChange={emailChanged}
      value={email}
      error={email && emailError}
    />
  )
}

const Password = () => {
  const password = useStore($password)
  const passwordError = useStore($passwordError)

  return (
    <FormInput
      name="password"
      type="password"
      autoComplete="password"
      label="Password"
      onChange={passwordChanged}
      value={password}
      error={password && passwordError}
    />
  )
}

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