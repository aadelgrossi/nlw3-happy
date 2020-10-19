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
  width: 24px;
  height: 24px;
  border: 1px solid #d3e2e5;
  margin-right: 8px;
  background: #f5f8fa;
  border-radius: 10px;
  transition: all 150ms;
`
