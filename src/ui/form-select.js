import React from 'react'
import Select from 'react-select'
import { Form } from 'antd'
import { FormError } from './form-error'

export const FormSelect = ({
  name,
  options,
  value,
  error,
  label,
  isMulti,
  onChange,
  onBlur,
}) => {
  const handleChange = (value) => {
    onChange(name, value)
  }
  const handleBlur = () => {
    onBlur(name, true)
  }

  return (
    <Form.Item
      className={error && 'has-error'}
      label={label}
    >
      <Select
        options={options}
        value={value}
        isMulti={isMulti}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {(error) && (
        <FormError>{error}</FormError>
      )}
    </Form.Item>
  )
}
