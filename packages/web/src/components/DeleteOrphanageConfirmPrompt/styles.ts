import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  align-items: center;
  place-content: center;
  padding: 0 10vw;

  height: 100vh;
  background: #ff669d;

  > svg {
    width: min(350px, 50%);
  }
`

export const Content = styled.div`
  width: 40%;
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
    margin: 20px 0;
  }
`

export const DeleteButton = styled.a`
  width: 320px;
  height: 64px;
  padding: 20px 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #d31f1f;
  border-radius: 20px;
  transition: background-color 0.2s ease-in;
  color: #fff;
  font-size: 18px;

  svg {
    margin-right: 20px;
  }

  &:hover {
    background-color: #de4f4a;
  }
`

export const BackButton = styled.a`
  font-size: 16px;
  color: #fff;

  display: flex;
  align-items: center;
  margin-top: 25px;

  svg {
    margin-right: 12px;
  }
`
