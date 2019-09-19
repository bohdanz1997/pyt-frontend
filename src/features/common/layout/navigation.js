import React from 'react'
import { NavLink as NavLinkRaw, Route } from 'react-router-dom'
import { Button, Typography } from 'antd'
import styled, { css } from 'styled-components'
import * as colors from '@ant-design/colors/lib'

export const Navigation = ({ menuItems }) => (
  <Container>
    {menuItems.map(({ path, icon, text }, index) => (
      <NavLink to={path} key={index}>
        <NavButton type="link" icon={icon} />
        <NavText>{text}</NavText>
      </NavLink>
    ))}
  </Container>
)

const NavLink = ({ to, children }) => (
  <Route
    path={to}
    exact={true}
    children={({ match }) => (
      <NavLinkStyled to={to} selected={Boolean(match)}>
        {children}
      </NavLinkStyled>
    )}
  />
)

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  height: 100%;
`

const NavButton = styled(Button)`
  font-size: 22px;
  color: ${colors.grey[5]}; 
`

const NavText = styled(Typography.Text)`
  line-height: 12px;
  font-size: 12px;
  text-align: center;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
`

const NavLinkStyled = styled(NavLinkRaw)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  
  ${({ selected }) => selected && css`
    & > * {
      color: ${colors.blue[5]};
    }
  `}

  &:hover,
  &:focus,
  &:active {
    & > * {
      color: ${colors.blue[5]};
    }
  }
`
