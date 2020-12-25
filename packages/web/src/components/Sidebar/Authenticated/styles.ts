import styled from 'styled-components'

import { Button } from '../styles'

export const Menu = styled.div``

interface ButtonProps {
  hasUnread?: boolean
}

export const MenuButton = styled(Button)<ButtonProps>`
  position: relative;

  & + & {
    margin-top: 24px;
  }

  span {
    position: absolute;
    width: 11px;
    height: 11px;
    border-radius: 100%;
    border: 2px solid #12afcb;
    background-color: #ffd666;
    top: 10px;
    right: 10px;
  }

  span.seen {
    visibility: hidden;
  }

  &.active {
    background: #ffd666;

    svg {
      stroke: #0089a5;
    }

    span {
      border: 2px solid #ffd666;
      background-color: #0089a5;
    }
  }
`
