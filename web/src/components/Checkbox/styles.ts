import styled from 'styled-components'

export const CheckboxContainer = styled.div``

export const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  border: 0;
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`

interface StyledCheckboxProps {
  checked: boolean
}

export const StyledCheckbox = styled.div<StyledCheckboxProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
  border: ${props => (props.checked ? 'none' : '1px solid #d3e2e5')};
  margin-right: 8px;
  background: ${props => (props.checked ? '#37C77F' : '#f5f8fa')};
  border-radius: 8px;
  transition: all 150ms;
  cursor: pointer;

  svg {
    color: ${props => (props.checked ? '#f5f8fa' : '#37C77F')};
  }
`
