import React from 'react'

import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { FiArrowLeft } from 'react-icons/fi'

import Illustration from '../../assets/delete-marker.svg'
import {
  ErrorPageContainer,
  ErrorPageContent,
  BackButton
} from '../styles/error'

interface ErrorProps {
  statusCode: number
}

const Error: NextPage<ErrorProps> = ({ statusCode }) => {
  const { replace } = useRouter()

  return (
    <ErrorPageContainer>
      <ErrorPageContent>
        <h1>Ops ocorreu um erro!</h1>
        <p>Alguma coisa deu errado no servidor. Código do erro: {statusCode}</p>
        <BackButton onClick={() => replace('/map')}>
          <FiArrowLeft size={20} color="#fff"></FiArrowLeft>
          Voltar ao mapa
        </BackButton>
      </ErrorPageContent>
      <Illustration />
    </ErrorPageContainer>
  )
}

Error.getInitialProps = ({ res, err }) => {
  const currentStatusCode = res?.statusCode || 500
  const throwedStatusCode = err?.statusCode

  const statusCode = throwedStatusCode || currentStatusCode

  if (res) {
    res.statusCode = statusCode
  }

  return { statusCode }
}

export default Error
