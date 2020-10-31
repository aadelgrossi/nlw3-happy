import React, { useCallback } from 'react'

import { Container, Content, DeleteButton, BackButton } from './styles'
import DeleteMarker from '../../../../assets/delete-marker.svg'
import { FiTrash, FiArrowLeft } from 'react-icons/fi'
import Link from 'next/link'
import api from '@/services/api'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useToast } from '@/hooks/toast'

interface OrphanageProps {
  id: string
  name: string
}

const DeleteOrphanage: NextPage<OrphanageProps> = ({ id, name }) => {
  const router = useRouter()
  const { addToast } = useToast()

  const handleDelete = useCallback(async () => {
    await api.delete(`/orphanages/${id}`)
    addToast({
      title: 'Operação realizada',
      description: 'Orfanato removido com sucesso',
      type: 'success'
    })
    router.push('/dashboard')
  }, [])

  return (
    <Container>
      <Content>
        <h1>Excluir!</h1>
        <p>Você tem certeza que quer excluir {name}?</p>
        <Link href="/map">
          <DeleteButton onClick={handleDelete}>
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
