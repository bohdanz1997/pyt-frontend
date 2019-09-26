import React from 'react'
import styled from 'styled-components'
import { MainTemplate, FullScreenLayout } from './main-template'

export const FixedHeaderTemplate = ({ children, header = null }) => (
  <MainTemplate
    header={header}
    children={children}
    layout={FixedHeaderLayout}
  />
)

const FixedHeaderLayout = styled(FullScreenLayout)`
  padding: 52px 0;

  & > header:first-child {
    position: fixed;
    top: 0;
    z-index: 1;
    width: 100%;
  }
`
