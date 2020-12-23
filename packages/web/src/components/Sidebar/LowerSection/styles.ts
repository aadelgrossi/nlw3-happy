import styled from 'styled-components'

export const Container = styled.footer`
  a:hover,
  button:hover {
    background: #17d6eb;
  }
`

export const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 48px;
  height: 48px;
  border: 0;
  border-radius: 16px;
  transition: background-color 0.2s;
  background: #12afcb;

  cursor: pointer;
`
