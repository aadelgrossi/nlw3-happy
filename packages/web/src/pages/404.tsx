import React from 'react'

import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { FiArrowLeft } from 'react-icons/fi'

import Illustration from '../assets/delete-marker.svg'
import {
  ErrorPageContainer,
  ErrorPageContent,
  BackButton
} from '../styles/error'

const Custom404: NextPage = () => {
  const { replace } = useRouter()

  return (
    <ErrorPageContainer>
      <ErrorPageContent>
        <h1>Ops, ocorreu um erro!</h1>
        <p>Página não encontrada.</p>
        <p>Verifique se a URL está correta.</p>
        <BackButton onClick={() => replace('/map')}>
          <FiArrowLeft size={20} color="#fff"></FiArrowLeft>
          Voltar ao mapa
        </BackButton>
      </ErrorPageContent>
      <Illustration />
    </ErrorPageContainer>
  )
}

export default Custom404
