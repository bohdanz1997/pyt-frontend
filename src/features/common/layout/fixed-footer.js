import styled from 'styled-components'
import { Layout } from 'antd'

export const FixedFooter = styled(Layout.Header)`
  position: fixed;
  bottom: 0;
  z-index: 1;
  width: 100%;
  background: #fff;
  padding: 0;
  height: 52px;
`
