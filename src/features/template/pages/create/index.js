import React from 'react'
import * as yup from 'yup'
import { Formik } from 'formik'
import { Card, Form } from 'antd'
import { useStore } from 'effector-react'

import { history } from '@lib/routing'
import { ActionButton, FixedBottom, FormInput, Row } from '@ui'
import { Authenticated, FixedHeaderTemplate, NavBackHeader } from '@features/common'
import { ExerciseTabsInput } from '../../components/exercise-tabs-input'
import { createTemplate } from '../../model'
import { $groupsExercises } from './model'

export const CreateTemplatePage = () => (
  <Authenticated
    render={() => (
      <FixedHeaderTemplate header={
        <NavBackHeader text="Create template" />
      }>
        <Row>
          <Card>
            <CreateTemplateForm />
          </Card>
        </Row>
      </FixedHeaderTemplate>
    )}
  />
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
      }) => (
        <Form onSubmit={handleSubmit}>
          <FormInput
            name="name"
            placeholder="Template name"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.name}
            error={touched.name && errors.name}
          />
          <ExerciseTabsInput
            name="exercises"
            options={groupsExercises}
            onChange={setFieldValue}
            onBlur={setFieldTouched}
            error={errors.exercises}
          />
          <FixedBottom>
            <ActionButton
              icon="check"
              loading={isSubmitting}
              onClick={handleSubmit}
            />
          </FixedBottom>
        </Form>
      )}
    </Formik>
  )
}

const handleSubmit = async (values, { setSubmitting, setStatus }) => {
  try {
    await createTemplate(values)
    setSubmitting(false)
    history.push('/templates')
  } catch (err) {
    setStatus({
      formError: err.response.data,
    })
  }
}

const schema = yup.object().shape({
  name: yup.string().required(),
  exercises: yup.array().min(1).required(),
})
