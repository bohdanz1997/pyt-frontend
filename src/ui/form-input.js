import React from 'react'
import * as P from 'prop-types'
import { Form, Input } from 'antd'
import { FormError } from './form-error'

export const FormInput = ({
  prefix,
  error,
  placeholder,
  type,
  name,
  label,
  autoComplete,
  disabled,
  onChange,
  onBlur,
  value,
  component: Component = Input,
}) => (
  <Form.Item
    className={error && 'has-error'}
    label={label}
  >
    <Component
      prefix={prefix}
      placeholder={placeholder}
      type={type}
      name={name}
      autoComplete={autoComplete}
      disabled={disabled}
      onChange={onChange}
      onBlur={onBlur}
      value={value}
      size="large"
    />
    {(error) && (
      <FormError>{error}</FormError>
    )}
  </Form.Item>
)

export const FormPassword = (props) => (
  <FormInput
    {...props}
    component={Input.Password}
  />
)

const inputPropTypes = {
  prefix: P.node,
  error: P.string,
  placeholder: P.string,
  type: P.string,
  name: P.string,
  label: P.node,
  autoComplete: P.string,
  disabled: P.bool,
  onChange: P.func,
  onBlur: P.func,
  value: P.string.isRequired,
}

FormInput.propTypes = {
  ...inputPropTypes,
  component: P.func,
}

FormPassword.propTypes = inputPropTypes
