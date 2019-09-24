import React from 'react'
import * as yup from 'yup'
import { Formik } from 'formik'
import { Modal } from 'antd'
import { FormSelect } from '@ui'

export const CreateWorkoutModal = ({ templateOptions, visible, onCancel, onSubmit }) => {
  const submit = (values) => {
    onSubmit(values.template.value)
  }

  return (
    <Formik
      initialValues={{ template: null }}
      onSubmit={submit}
      validationSchema={yup.object().shape({
        template: yup.mixed().required(),
      })}
    >
      {({
        values,
        errors,
        touched,
        handleSubmit,
        setFieldValue,
        setFieldTouched,
      }) => (
        <Modal
          visible={visible}
          onCancel={onCancel}
          onOk={handleSubmit}
        >
          <FormSelect
            name="template"
            label="Select template"
            options={templateOptions}
            onChange={setFieldValue}
            onBlur={setFieldTouched}
            value={values.template}
            error={touched.template && errors.template}
          />
        </Modal>
      )}
    </Formik>
  )
}
