import React from 'react'

import Link from 'next/link'
import { FiMapPin } from 'react-icons/fi'

import HappyMarker from '../../assets/success-marker.svg'
import { Container, Content, BackButton } from './styles'

const CreateOrphanageSucessPrompt: React.FC = () => {
  return (
    <Container>
      <Content>
        <h1>Ebaaa!</h1>
        <p>
          O cadastro deu certo e foi enviado ao administrador para ser aprovado.
          Agora é só esperar {':)'}
        </p>
        <Link href="/map">
          <BackButton>
            <FiMapPin size={20} color="#fff"></FiMapPin>
            Voltar para o mapa
          </BackButton>
        </Link>
      </Content>
      <HappyMarker />
    </Container>
  )
}

export default CreateOrphanageSucessPrompt
