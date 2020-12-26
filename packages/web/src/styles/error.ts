import styled from 'styled-components'

export const ErrorPageContainer = styled.div`
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

export const ErrorPageContent = styled.div`
  width: max(350px, 50%);
  display: flex;
  margin-right: 80px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;

  h1 {
    font-size: 70px;
    line-height: 0.9;
    font-weight: 800;
    margin-bottom: 20px;
  }

  p {
    font-size: 20px;
  }
`

export const BackButton = styled.a`
  width: 320px;
  height: 64px;
  padding: 20px 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #d31f1f;
  border-radius: 20px;
  transition: background-color 0.2s ease-in;
  color: #fff;
  font-size: 18px;
  margin-top: 20px;

  svg {
    margin-right: 20px;
  }

  &:hover {
    background-color: #de4f4a;
  }
`
