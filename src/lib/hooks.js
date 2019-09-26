import { useEffect, useState } from 'react'
import { history } from '@lib/routing'

export const useModal = (opened = false) => {
  const [visible, setVisible] = useState(opened)

  const open = () => setVisible(true)
  const close = () => setVisible(false)

  return { visible, open, close }
}

export const useRedirect = (condition, redirectTo) => {
  useEffect(() => {
    if (condition) {
      history.push(redirectTo)
    }
  }, [condition, redirectTo])
}
