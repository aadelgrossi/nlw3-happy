import styled, { css } from 'styled-components'

interface ConfirmButtonProps {
  disabled: boolean
}

export const Container = styled.button<ConfirmButtonProps>`
  width: 100%;
  height: 64px;
  border: 0;
  cursor: pointer;
  background: #37c77f;
  border-radius: 20px;
  color: #ffffff;
  margin-top: 64px;
  font-weight: 800;

  display: flex;
  justify-content: center;
  align-items: center;

  ${props =>
    props.disabled &&
    css`
      cursor: not-allowed;
      pointer-events: none;
      opacity: 0.5;
    `}

  transition: background-color, opacity 0.2s;

  svg {
    margin-right: 16px;
  }

  &:hover {
    background: #36cf82;
  }
`

export const LoadingText = styled.div`
  margin-left: 10px;
`
