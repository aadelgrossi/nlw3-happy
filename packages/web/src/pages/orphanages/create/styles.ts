import { Form as Unform } from '@unform/web'
import styled from 'styled-components'

export const Container = styled.div`
  display: flex;

  main {
    flex: 1;
  }
`

export const Form = styled(Unform)`
  width: 700px;
  margin: 64px auto;

  background: #ffffff;
  border: 1px solid #d3e2e5;
  border-radius: 20px;

  padding: 64px 80px;

  overflow: hidden;

  .leaflet-container {
    margin-bottom: 40px;
    border: 1px solid #d3e2e5;
    border-radius: 20px;
  }
`

export const FormGroup = styled.fieldset`
  border: 0;

  & + & {
    margin-top: 80px;
  }

  legend {
    width: 100%;

    font-size: 32px;
    line-height: 34px;
    color: #5c8599;
    font-weight: 700;

    border-bottom: 1px solid #d3e2e5;
    margin-bottom: 40px;
    padding-bottom: 24px;
  }
`

export const MapWrapper = styled.div`
  background: #f5f8fa;
  border-radius: 20px;
  border: 1px solid #d3e2e5;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const MapLegend = styled.div`
  color: #0089a5;
  height: 48px;
  display: flex;
  align-content: center;
  align-items: center;
  font-size: 14px;
`

export const InputBlock = styled.div`
  & + & {
    margin-top: 24px;
  }

  .images-container {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 16px;

    img {
      width: 100%;
      height: 96px;
      object-fit: contain;
      border-radius: 20px;
      border: 1px solid #d3e2e5;
    }
  }

  input[type='file'] {
    display: none;
  }

  label {
    display: flex;
    color: #8fa7b3;
    font-size: 16px;
    margin-bottom: 8px;
    line-height: 24px;

    span {
      font-size: 14px;
      color: #8fa7b3;
      margin-left: 24px;
      line-height: 24px;
    }
  }
`

export const NewImage = styled.label`
  height: 96px;
  background: #f5f8fa;
  border: 1px dashed #96d2f0;
  border-radius: 20px;
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;
`
export const ButtonSelect = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;

  button {
    height: 64px;
    background: #f5f8fa;
    border: 1px solid #d3e2e5;
    color: #5c8599;
    cursor: pointer;
  }

  button.active {
    background: #edfff6;
    border: 1px solid #a1e9c5;
    color: #37c77f;
  }

  button:first-of-type {
    border-radius: 20px 0px 0px 20px;
  }

  button:nth-of-type(2) {
    border-radius: 0 20px 20px 0;
    border-left: 0;
  }
`
export const ConfirmButton = styled.button`
  margin-top: 64px;

  width: 100%;
  height: 64px;
  border: 0;
  cursor: pointer;
  background: #3cdc8c;
  border-radius: 20px;
  color: #ffffff;
  font-weight: 800;

  display: flex;
  justify-content: center;
  align-items: center;

  transition: background-color 0.2s;

  svg {
    margin-right: 16px;
  }

  &:hover {
    background: #36cf82;
  }
`
