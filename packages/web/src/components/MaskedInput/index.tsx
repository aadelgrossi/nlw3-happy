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

const MaskedInput: React.FC<InputProps> = ({ name, children, ...rest }) => {
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
        <ReactInputMask
          ref={inputRef}
          mask="(99) 99999-9999"
          defaultValue={defaultValue}
          onBlur={handleInputBlur}
          onFocus={handleInputFocus}
          {...rest}
        ></ReactInputMask>
        {children}
      </InputContainer>
      {error && <span>{error}</span>}
    </Wrapper>
  )
}

export default MaskedInput
