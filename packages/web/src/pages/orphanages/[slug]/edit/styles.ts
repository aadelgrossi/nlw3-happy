import styled, { css } from 'styled-components'

export const Container = styled.div`
  display: flex;

  main {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  form {
    margin-bottom: unset;
  }
`

export const Actions = styled.div`
  margin-top: -20px;
  margin-bottom: 64px;
  width: 700px;
  padding: 48px 80px;
  background-color: #f5f8fa;
  border-radius: 0px 0px 20px 20px;
  border: 1px solid #d3e2e5;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const buttonCSS = css`
  height: 64px;
  width: 264px;
  padding: 20px 78px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    margin-right: 16px;
  }
`

export const ConfirmButton = styled.a`
  ${buttonCSS}
  background-color: #3cdc8c;
`
export const RejectButton = styled.a`
  ${buttonCSS}
  background-color: #ff669d;
`
