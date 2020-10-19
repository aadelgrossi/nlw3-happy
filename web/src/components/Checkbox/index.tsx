import React from 'react'

import { CheckboxContainer, HiddenCheckbox, StyledCheckbox } from './styles'
import { FiCheck } from 'react-icons/fi'

interface CheckboxProps {
  checked: boolean
  onChange(): void
}

const Checkbox: React.FC<CheckboxProps> = ({ checked, ...props }) => {
  return (
    <CheckboxContainer>
      <HiddenCheckbox checked={checked} {...props} />
      <StyledCheckbox checked={checked}>
        {checked && <FiCheck size={24}></FiCheck>}
      </StyledCheckbox>
    </CheckboxContainer>
  )
}

export default Checkbox
