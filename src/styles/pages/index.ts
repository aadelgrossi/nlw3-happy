import styled from 'styled-components'

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(329.54deg, #29b6d1 0%, #00c7c7 100%);

  display: flex;
  justify-content: center;
  align-items: center;
`

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: space-between;
  background: url('/images/landing-illustration.svg') no-repeat 80% center;
  background-size: 50%;

  width: 100%;
  max-width: 1100px;

  height: 100%;
  max-height: 680px;
  padding: 40px;
`
export const LeftSection = styled.main`
  h1 {
    max-width: 350px;
    font-size: 76px;
    font-weight: 900;
    line-height: 70px;
  }

  p {
    max-width: 350px;
    margin-top: 40px;
    font-size: 24px;
    line-height: 34px;
  }
`

export const Location = styled.div`
  position: absolute;
  right: 40px;
  top: 40px;

  font-size: 24px;
  line-height: 34px;
  display: flex;
  flex-direction: column;
  text-align: right;

  strong {
    font-weight: 800;
  }
`
export const EnterAppButton = styled.a`
  position: absolute;
  right: 40px;
  bottom: 40px;

  width: 80px;
  height: 80px;
  background: #ffd666;
  border-radius: 30px;

  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;

  &:hover {
    background: #96feff;
  }
`
