import { useState } from 'react'

export const useModal = (opened = false) => {
  const [visible, setVisible] = useState(opened)

  const open = () => setVisible(true)
  const close = () => setVisible(false)

  return { visible, open, close }
}
