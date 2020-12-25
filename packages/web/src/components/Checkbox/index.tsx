import React, { useRef, useEffect } from 'react'

import { useField } from '@unform/core'
import { HiCheck } from 'react-icons/hi'

import { CheckboxContainer, HiddenCheckbox, StyledCheckbox } from './styles'

interface CheckboxProps {
  name: string
  checked: boolean
  onChange(): void
}

const Checkbox: React.FC<CheckboxProps> = ({ name, checked, ...props }) => {
  const inputRef = useRef(null)

  const { fieldName, registerField, defaultValue = checked } = useField(name)

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value'
    })
  }, [fieldName, registerField])

  return (
    <CheckboxContainer>
      <HiddenCheckbox
        ref={inputRef}
        defaultValue={Number(defaultValue)}
        checked={checked}
        {...props}
      />
      <StyledCheckbox checked={checked}>
        {checked && <HiCheck size={18}></HiCheck>}
      </StyledCheckbox>
    </CheckboxContainer>
  )
}

export default Checkbox
