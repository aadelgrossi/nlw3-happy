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

export const Footer = styled.footer`
  a:hover,
  button:hover {
    background: #17d6eb;
  }
`
