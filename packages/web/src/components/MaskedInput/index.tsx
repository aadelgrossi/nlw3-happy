import React, {
  InputHTMLAttributes,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react'
import { useField } from '@unform/core'
import { Wrapper, InputContainer } from './styles'
import ReactInputMask from 'react-input-mask'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  label?: string
  mask?: string
}

const MaskedInput: React.FC<InputProps> = ({
  name,
  label,
  type,
  children,
  mask = '(99) 99999-9999',
  ...rest
}) => {
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
      {label && <label htmlFor={name}>{label}</label>}
      <InputContainer
        type={type}
        isFilled={isFilled}
        isFocused={isFocused}
        hasError={!!error}
      >
        <ReactInputMask
          ref={inputRef}
          mask={mask}
          defaultValue={defaultValue}
          onBlur={handleInputBlur}
          onFocus={handleInputFocus}
          {...rest}
        ></ReactInputMask>
        {children}
      </InputContainer>
    </Wrapper>
  )
}

export default MaskedInput
