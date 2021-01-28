import React, {
  InputHTMLAttributes,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react'

import { useField } from '@unform/core'
import ReactInputMask from 'react-input-mask'

import { Wrapper, InputContainer } from './styles'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  label?: string
}

const MaskedInput: React.FC<InputProps> = ({ name, children, ...rest }) => {
  const inputRef = useRef(null)
  const [isFocused, setIsFocused] = useState(false)
  const { fieldName, registerField, error } = useField(name)

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value'
    })
  }, [fieldName, registerField])

  const handleInputFocus = useCallback(() => {
    setIsFocused(true)
  }, [])

  const handleInputBlur = useCallback(() => {
    setIsFocused(false)
  }, [])

  return (
    <Wrapper>
      <InputContainer isFocused={isFocused} hasError={!!error}>
        <ReactInputMask
          ref={inputRef}
          mask="(99) 99999-9999"
          onBlur={handleInputBlur}
          onFocus={handleInputFocus}
          {...rest}
        />
        {children}
      </InputContainer>
      {error && <span>{error}</span>}
    </Wrapper>
  )
}

export default MaskedInput
