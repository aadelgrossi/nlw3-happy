import React from 'react'

import { Container, Content, DeleteButton, BackButton } from './styles'
import DeleteMarker from '../../../../assets/delete-marker.svg'
import { FiTrash, FiArrowLeft } from 'react-icons/fi'
import Link from 'next/link'
import api from '@/services/api'
import { NextPage } from 'next'

interface OrphanageProps {
  name: string
}

const DeleteOrphanage: NextPage<OrphanageProps> = ({ name }) => {
  return (
    <Container>
      <Content>
        <h1>Excluir!</h1>
        <p>Você tem certeza que quer excluir {name}?</p>
        <Link href="/map">
          <DeleteButton>
            <FiTrash size={20} color="#fff"></FiTrash>
            Sim, confirmar exclusão
          </DeleteButton>
        </Link>

        <Link href="/dashboard">
          <BackButton>
            <FiArrowLeft size={20} color="#fff"></FiArrowLeft>
            Não, voltar ao dashboard
          </BackButton>
        </Link>
      </Content>
      <DeleteMarker />
    </Container>
  )
}

DeleteOrphanage.getInitialProps = async ({ query }) => {
  const response = await api.get(`/orphanages/${query.slug}`)

  const orphanage = response.data
  return orphanage
}

export default DeleteOrphanage
