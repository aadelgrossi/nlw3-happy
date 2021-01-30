import React, {
  ForwardRefRenderFunction,
  forwardRef,
  useImperativeHandle,
  useRef,
  useState
} from 'react'

import { Control, Controller, FieldError } from 'react-hook-form'
import { TextInput, TextInputProps } from 'react-native'

import { Container, InputField, Error, InputWrapper } from './styles'

export interface InputProps extends TextInputProps {
  name: string
  errors?: FieldError
  control: Control
}

interface InputRef {
  focus(): void
}

const InputComponent: ForwardRefRenderFunction<InputRef, InputProps> = (
  { control, name, errors = null, ...rest },
  ref
) => {
  const [isFocused, setIsFocused] = useState(false)
  const inputElementRef = useRef<TextInput>(null)

  useImperativeHandle(ref, () => ({
    focus() {
      inputElementRef.current.focus()
    }
  }))

  return (
    <Controller
      control={control}
      name={name}
      render={({ onChange }) => (
        <Container>
          <InputWrapper hasError={!!errors} isFocused={isFocused}>
            <InputField
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onChangeText={value => onChange(value)}
              {...rest}
            />
          </InputWrapper>
          <Error style={{ opacity: Number(!!errors) }}>
            {errors && errors.message}
          </Error>
        </Container>
      )}
    />
  )
}

export const Input = forwardRef(InputComponent)
