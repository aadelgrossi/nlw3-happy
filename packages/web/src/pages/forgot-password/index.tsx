import FormContainer from '@/components/FormContainer'
import Input from '@/components/Input'
import LogoContainer from '@/components/LogoContainer'
import { FormHandles } from '@unform/core'
import { useRouter } from 'next/router'
import React, { useCallback, useRef, useState } from 'react'
import { FiArrowLeft } from 'react-icons/fi'
import * as Yup from 'yup'

import {
  Container,
  BackButton,
  ForgotPasswordForm,
  ConfirmButton
} from './styles'

const ForgotPassword: React.FC = () => {
  const [isFormValid, setIsFormValid] = useState(false)
  const { back } = useRouter()
  const formRef = useRef<FormHandles>(null)

  const handleSubmit = useCallback(() => {
    console.log('submitted')
  }, [])

  const performValidation = useCallback(async () => {
    try {
      setIsFormValid(true)
      formRef.current?.setErrors({})
      const data = formRef.current.getData()

      const schema = Yup.object().shape({
        email: Yup.string().required().email()
      })

      await schema.validate(data, { abortEarly: false })
    } catch (err) {
      setIsFormValid(false)
    }
  }, [])

  return (
    <Container>
      <LogoContainer></LogoContainer>
      <FormContainer>
        <BackButton onClick={back}>
          <FiArrowLeft size={24} color="#15C3D6" />
        </BackButton>

        <ForgotPasswordForm ref={formRef} onSubmit={handleSubmit}>
          <h1>Esqueci a senha</h1>
          <p>
            Informe seu email para receber as instruções e redefinir sua senha
          </p>

          <Input label="Email" name="email" onKeyUp={performValidation}></Input>
          <ConfirmButton disabled={!isFormValid}>Enviar</ConfirmButton>
        </ForgotPasswordForm>
      </FormContainer>
    </Container>
  )
}

export default ForgotPassword
