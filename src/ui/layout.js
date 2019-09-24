import React from 'react'
import * as P from 'prop-types'

import { Row as AntRow, Col as AntCol } from 'antd'
import styled, { css } from 'styled-components'

export const WithTag = ({ as: HtmlTagName, children, ...props }) => (
  <HtmlTagName {...props}>{children}</HtmlTagName>
)

const is = (value) => typeof value !== 'undefined'
const prop = (value) => (is(value) ? value : 'initial')

export const mixins = (props) => css`
  // align-content: ${prop(props.alignContent)};
  // align-items: ${prop(props.align)};
  // flex-basis: ${prop(props.basis)};
  // flex-grow: ${prop(props.grow)};
  // flex-shrink: ${prop(props.shrink)};
  // justify-content: ${prop(props.justify)};
  // order: ${prop(props.order)};
  // width: ${prop(props.width)};
  padding: ${prop(props.padding)};
`

const RowWrapper = ({ gap, children, ...rest }) => (
  <AntRow {...rest}>{children}</AntRow>
)

const ColWrapper = ({ gap, children, ...rest }) => (
  <AntCol {...rest}>{children}</AntCol>
)

export const Row = styled(RowWrapper)`
  ${mixins}

  ${(p) => p.gap &&
    css`
      & > :not(:first-child) {
        margin-left: ${p.gap};
      }
    `}
`

export const Col = styled(ColWrapper)`
  ${mixins}

  ${(p) => p.gap &&
    css`
      & > :not(:first-child) {
        margin-top: ${p.gap};
      }
    `}
`

Row.propTypes = Col.propTypes = {
  gap: P.oneOfType([P.string, P.number]),

  // grow: P.number,

  // shrink: P.number,

  // basis: P.oneOfType([P.number, P.string]),

  padding: P.oneOfType([P.number, P.string]),

  // align: P.oneOf([
  //   'flex-start',
  //   'flex-end',
  //   'center',
  //   'baseline',
  //   'stretch',
  // ]),

  // justify: P.oneOf([
  //   'flex-start',
  //   'flex-end',
  //   'center',
  //   'space-around',
  //   'space-between',
  //   'space-evenly',
  //   'safe center',
  //   'unsafe center',
  // ]),

  // alignContent: P.oneOf([
  //   'flex-start',
  //   'flex-end',
  //   'center',
  //   'space-around',
  //   'space-between',
  //   'stretch',
  // ]),

  // order: P.number,

  // width: P.oneOfType([P.string, P.number]),
}
