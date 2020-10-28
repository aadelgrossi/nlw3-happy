import React, {
  InputHTMLAttributes,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react'
import { useField } from '@unform/core'
import { Wrapper, InputContainer } from './styles'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  label?: string
  additional_info?: string
  containerStyle?: Record<string, unknown>
}

const Input: React.FC<InputProps> = ({ name, type, children, ...rest }) => {
  const inputRef = useRef(null)
  const [isFocused, setIsFocused] = useState(false)
  const [isFilled, setIsFilled] = useState(false)
  const { fieldName, registerField, defaultValue, error } = useField(name)

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
        type={type}
        isFilled={isFilled}
        isFocused={isFocused}
        hasError={!!error}
      >
        <input
          ref={inputRef}
          defaultValue={defaultValue}
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

export default Input
