import React from 'react'
import * as P from 'prop-types'
import Picker from 'rmc-picker'
import 'rmc-picker/assets/index.css'
import './number-picker.css'

export const NumberPicker = ({ values, selectedValue, onChange, disabled }) => {
  const handleChange = (newValue) => {
    onChange(newValue)
  }

  return (
    <Picker
      disabled={disabled}
      selectedValue={selectedValue}
      onValueChange={handleChange}
    >
      {values.map((value) => (
        <Picker.Item value={value} key={value}>
          {value}
        </Picker.Item>
      ))}
    </Picker>
  )
}

NumberPicker.propTypes = {
  values: P.arrayOf(P.number).isRequired,
  selectedValue: P.number.isRequired,
  onChange: P.func.isRequired,
  disabled: P.bool,
}
