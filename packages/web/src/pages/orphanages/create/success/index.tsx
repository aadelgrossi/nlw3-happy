import React from 'react'

import { Container, Content, BackButton } from './styles'
import HappyMarker from '../../../../assets/success-marker.svg'
import { FiMapPin } from 'react-icons/fi'
import Link from 'next/link'

const Success: React.FC = () => {
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

export default Success
