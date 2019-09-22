import { createEffect, createStore } from 'effector'
import { templateApi } from './api'

export const loadTemplates = createEffect()
export const removeTemplate = createEffect()
export const createTemplate = createEffect()

export const $templates = createStore([])

loadTemplates.use(() => templateApi.getList())
removeTemplate.use((templateId) => templateApi.remove(templateId))
createTemplate.use((templateData) => templateApi.create(templateData))

$templates.on(loadTemplates.done, (_, { result }) => result.result)
$templates.on(
  removeTemplate.done,
  (templates, { result }) => templates.filter((template) => template.id !== result.result),
)
$templates.on(createTemplate.done, (templates, { result }) => templates.concat(result.result))
