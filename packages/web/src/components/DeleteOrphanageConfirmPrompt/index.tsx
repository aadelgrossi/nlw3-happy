import React, { useCallback } from 'react'

import { useToast } from '@/hooks/toast'
import api from '@/services/api'
import { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FiTrash, FiArrowLeft } from 'react-icons/fi'

import DeleteMarker from '../../../../assets/delete-marker.svg'
import { Container, Content, DeleteButton, BackButton } from './styles'

interface OrphanageProps {
  id: string
  name: string
}

const DeleteOrphanageConfirmPrompt: NextPage<OrphanageProps> = ({
  id,
  name
}) => {
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

DeleteOrphanageConfirmPrompt.getInitialProps = async ({ query }) => {
  const response = await api.get(`/orphanages/${query.slug}`)

  const orphanage = response.data
  return orphanage
}

export default DeleteOrphanageConfirmPrompt
