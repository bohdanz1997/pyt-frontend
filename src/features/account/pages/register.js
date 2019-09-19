import React, { useEffect } from 'react'
import { request } from '@features/common'

export const RegisterPage = () => {
  useEffect(
    () => {
      request('GET', '/groups').then(console.log)
    },
    [],
  )

  return null
}
