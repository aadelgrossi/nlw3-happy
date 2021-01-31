import styled, { css } from 'styled-components/native'

interface ItemProps {
  type: 'opening_hours' | 'open_on_weekends' | 'closed_on_weekends'
}

export const Container = styled.View<ItemProps>`
  width: 48%;
  padding: 20px;

  ${props =>
    props.type === 'opening_hours' &&
    css`
      background-color: #e6f7fb;
      border: 1px solid #b3dae2;
      border-radius: 20px;
    `}

  ${props =>
    props.type === 'open_on_weekends' &&
    css`
      background-color: #edfff6;
      border: 1px solid #a1e9c5;
      border-radius: 20px;
    `}

    ${props =>
    props.type === 'closed_on_weekends' &&
    css`
      background-color: #fef9f9;
      border: 1px solid #ffbcd4;
      border-radius: 20px;
    `}
`

export const Text = styled.Text<ItemProps>`
  font-family: 'nunitoRegular';
  font-size: 16px;
  line-height: 24px;
  margin-top: 20px;

  ${props =>
    props.type === 'opening_hours' &&
    css`
      color: #5c8599;
    `}

  ${props =>
    props.type === 'open_on_weekends' &&
    css`
      color: #37c77f;
    `}

    ${props =>
    props.type === 'closed_on_weekends' &&
    css`
      color: #ff669d;
    `}
`
