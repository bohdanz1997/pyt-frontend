import { createEvent, createStore } from 'effector'

export function createFetching(
  effect,
  initialStatus = 'initial',
  params = {},
) {
  const customReset = params.reset || createEvent()

  const result = createStore(params.result || null)
    .reset(effect)
    .reset(effect.fail)
    .reset(customReset)
    .on(effect.done, (_, { result: value }) => value)

  const error = createStore(params.error || null)
    .reset(effect)
    .reset(effect.done)
    .reset(customReset)
    .on(effect.fail, (_, { error }) => error.response.data)

  const status = createStore(initialStatus)
    .on(effect, () => 'loading')
    .on(effect.done, () => 'done')
    .on(effect.fail, () => 'fail')
    .on(customReset, () => 'initial')

  const isDone = status.map((state) => state === 'done')
  const isFailed = status.map((state) => state === 'fail')
  const isLoading = status.map((state) => state === 'loading')

  return { result, error, status, isDone, isFailed, isLoading }
}
