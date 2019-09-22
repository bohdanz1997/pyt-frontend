export const mapApiError = (mappers, defaultMsg = 'Got an unexpected error. Try again later') =>
  (err) => mappers[err] || defaultMsg
