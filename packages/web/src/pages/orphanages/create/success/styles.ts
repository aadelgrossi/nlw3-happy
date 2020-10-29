import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  align-items: center;
  place-content: center;
  padding: 0 10vw;

  height: 100vh;
  background: #37c77f;

  > svg {
    width: min(350px, 50%);
  }
`

export const Content = styled.div`
  width: 35%;
  display: flex;
  margin-right: 80px;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h1 {
    font-size: 80px;
    font-weight: 800;
  }

  p {
    text-align: center;
    font-size: 24px;
    margin: 20px 0 64px;
  }
`

export const BackButton = styled.a`
  width: 280px;
  height: 64px;
  padding: 20px 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #31b272;
  border-radius: 20px;
  transition: background-color 0.2s ease-in;
  color: #fff;
  font-size: 18px;

  &:hover {
    background-color: #3bd689;
  }
`
