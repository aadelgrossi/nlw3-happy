import React from 'react'

import { HiCheck } from 'react-icons/hi'

import { CheckboxContainer, HiddenCheckbox, StyledCheckbox } from './styles'

interface CheckboxProps {
  checked: boolean
  onChange(): void
}

const Checkbox: React.FC<CheckboxProps> = ({ checked, ...props }) => {
  return (
    <CheckboxContainer>
      <HiddenCheckbox checked={checked} {...props} />
      <StyledCheckbox checked={checked}>
        {checked && <HiCheck size={18}></HiCheck>}
      </StyledCheckbox>
    </CheckboxContainer>
  )
}

export default Checkbox
