import React from 'react'
import { Button } from 'antd'
import { Link } from 'react-router-dom'
import { CenterContent, H3 } from '@ui'

import { FullScreenLayout } from '../templates/main-template'

export const AuthOnlyView = () => (
  <FullScreenLayout>
    <CenterContent>
      <H3>Authenticated only</H3>
      <Link to="/login">
        <Button size="large">Sign in</Button>
      </Link>
    </CenterContent>
  </FullScreenLayout>
)

