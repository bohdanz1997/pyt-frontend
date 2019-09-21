import React from 'react'
import * as yup from 'yup'
import { Formik } from 'formik'
import { Card, Form } from 'antd'
import { useStore } from 'effector-react'
import { createEvent } from 'effector'

import { history } from '@lib/routing'
import { ActionButton, FormInput } from '@ui'
import { templateApi } from '@features/template/api'
import { FixedHeaderTemplate, NavBackHeader } from '@features/common'
import { $groupsExercises } from '@features/exercises'
import { ExerciseTreeInput } from '../components/exercise-tree-input'

const pageReady = createEvent()

pageReady.watch(() => {
})

const handleSubmit = async (values, { setSubmitting, setStatus }) => {
  try {
    await templateApi.create(values)
    history.push('/templates')
  } catch (err) {
    setStatus({
      formError: err.response.data,
    })
  }
  setSubmitting(false)
}

const schema = yup.object().shape({
  name: yup.string()
    .required(),
  exercises: yup.array()
    .min(1)
    .required(),
})

export const CreateTemplatePage = () => (
  <FixedHeaderTemplate header={
    <NavBackHeader text="Create template" />
  }>
    <Card>
      <CreateTemplateForm />
    </Card>
  </FixedHeaderTemplate>
)

const CreateTemplateForm = () => {
  const groupsExercises = useStore($groupsExercises)

  return (
    <Formik
      initialValues={{
        name: '',
        exercises: [],
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
        setFieldValue,
        setFieldTouched,
        isSubmitting,
        isValid,
      }) => (
        <Form onSubmit={handleSubmit}>
          <FormInput
            name="name"
            label="Name"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.name}
            error={touched.name && errors.name}
          />
          <ExerciseTreeInput
            name="exercises"
            label="Exercises"
            options={groupsExercises}
            onChange={setFieldValue}
            onBlur={setFieldTouched}
            error={errors.exercises}
          />
          {isValid && (
            <ActionButton
              icon="check"
              loading={isSubmitting}
              onClick={handleSubmit}
            />
          )}
        </Form>
      )}
    </Formik>
  )
}