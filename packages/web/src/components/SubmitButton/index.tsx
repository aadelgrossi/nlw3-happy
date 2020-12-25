import React, { HTMLProps } from 'react'

import MoonLoader from 'react-spinners/MoonLoader'

import { Container, LoadingText } from './styles'

interface ButtonProps extends HTMLProps<HTMLButtonElement> {
  loading?: boolean
  formValid?: boolean
}

const SubmitButton: React.FC<ButtonProps> = ({
  children,
  loading = false,
  formValid = true
}) => {
  return (
    <Container disabled={loading || !formValid}>
      {loading && <MoonLoader size={18} color="#fff" />}
      {loading ? <LoadingText>Carregando...</LoadingText> : children}
    </Container>
  )
}

export default SubmitButton
