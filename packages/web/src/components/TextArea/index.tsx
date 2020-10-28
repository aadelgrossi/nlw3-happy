import React, {
  InputHTMLAttributes,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react'
import { useField } from '@unform/core'

import { InputContainer } from './styles'
import { Wrapper } from '../Input/styles'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  containerStyle?: Record<string, unknown>
}

const TextArea: React.FC<InputProps> = ({ name, children }) => {
  const inputRef = useRef(null)
  const [isFocused, setIsFocused] = useState(false)
  const [isFilled, setIsFilled] = useState(false)
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

    setIsFilled(!!inputRef.current?.value)
  }, [])

  return (
    <Wrapper>
      <InputContainer
        isFilled={isFilled}
        isFocused={isFocused}
        hasError={!!error}
      >
        <textarea
          ref={inputRef}
          maxLength={300}
          defaultValue={defaultValue}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
        />
        {children}
      </InputContainer>
      {error && <span>{error}</span>}
    </Wrapper>
  )
}

export default TextArea
