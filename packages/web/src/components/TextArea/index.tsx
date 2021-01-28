import React, {
  InputHTMLAttributes,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react'

import { useField } from '@unform/core'

import { Wrapper } from '../Input/styles'
import { InputContainer } from './styles'

interface InputProps extends InputHTMLAttributes<HTMLTextAreaElement> {
  name: string
  containerStyle?: Record<string, unknown>
}

const TextArea: React.FC<InputProps> = ({ name, children, ...rest }) => {
  const inputRef = useRef(null)
  const [isFocused, setIsFocused] = useState(false)
  const { fieldName, defaultValue, registerField, error } = useField(name)

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
        <textarea
          ref={inputRef}
          maxLength={300}
          defaultValue={defaultValue}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          {...rest}
        />
        {children}
      </InputContainer>
      {error && <span>{error}</span>}
    </Wrapper>
  )
}

export default TextArea
