import styled from 'styled-components'

export const Container = styled.aside`
  position: fixed;
  height: 100%;
  padding: 32px 24px;
  background: linear-gradient(329.54deg, #15b6d6 0%, #15d6d6 100%);

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  img {
    width: 48px;
  }
`

export const Menu = styled.div``

export const Footer = styled.footer`
  a,
  button {
    width: 48px;
    height: 48px;

    border: 0;

    background: #12afcb;
    border-radius: 16px;

    cursor: pointer;

    transition: background-color 0.2s;

    display: flex;
    justify-content: center;
    align-items: center;
  }

  a:hover,
  button:hover {
    background: #17d6eb;
  }
`

interface ButtonProps {
  hasUnread?: boolean
}

export const Button = styled.button<ButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  width: 48px;
  height: 48px;
  border: 0;
  background: #12afcb;
  border-radius: 16px;
  cursor: pointer;
  transition: background-color 0.2s;

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
