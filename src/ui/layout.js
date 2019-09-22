import React from 'react'
import { Row as AntRow, Col as AntCol } from 'antd'
import styled, { css } from 'styled-components'

export const WithTag = ({ as: HtmlTagName, children, ...props }) => (
  <HtmlTagName {...props}>{children}</HtmlTagName>
)

const RowWrapper = ({ gap, children, ...rest }) => (
  <AntRow {...rest}>{children}</AntRow>
)

const ColWrapper = ({ gap, children, ...rest }) => (
  <AntCol {...rest}>{children}</AntCol>
)

export const Row = styled(RowWrapper)`
  ${(p) => p.gap &&
    css`
      & > :not(:first-child) {
        margin-left: ${p.gap};
      }
    `}
`

export const Col = styled(ColWrapper)`
  ${(p) => p.gap &&
    css`
      & > :not(:first-child) {
        margin-top: ${p.gap};
      }
    `}
`
