import styled from 'styled-components'

export const Container = styled.label`
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

  & + & {
    margin-top: 20px;
  }
`
