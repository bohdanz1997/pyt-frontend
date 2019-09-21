import { createEffect, createEvent, createStore } from 'effector'
import { templateApi } from './api'

export const loadTemplates = createEffect()
export const removeTemplate = createEffect()

export const $templates = createStore([])

loadTemplates.use(() => templateApi.getList())
removeTemplate.use((templateId) => templateApi.remove(templateId))

$templates.on(loadTemplates.done, (_, { result }) => result.result)
$templates.on(
  removeTemplate.done,
  (templates, { result }) => templates.filter((template) => template.id !== result.result),
)
