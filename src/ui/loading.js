import React from 'react'
import { Spin } from 'antd'
import styled from 'styled-components'

export const Loading = () => (
  <Wrapper>
    <Spin spinning={true} size="large" />
  </Wrapper>
)

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding-top: 200px;
`
