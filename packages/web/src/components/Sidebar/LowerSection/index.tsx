import React, { useCallback } from 'react'

import { useAuth } from '@/hooks/auth'
import { useToast } from '@/hooks/toast'
import { useRouter } from 'next/router'
import { FiArrowLeft, FiPower } from 'react-icons/fi'

import { Button } from '../styles'
import { Container } from './styles'

const LowerSection: React.FC = () => {
  const router = useRouter()
  const { signOut } = useAuth()
  const { addToast } = useToast()

  const handleSignOut = useCallback(() => {
    signOut()
    addToast({ title: 'Sessão encerrada', type: 'info' })
    router.push('/signin')
  }, [])

  return (
    <Container>
      {router.pathname === '/dashboard' ? (
        <Button type="button" onClick={handleSignOut}>
          <FiPower size={24} color="#FFF" />
        </Button>
      ) : (
        <Button type="button" onClick={() => router.back()}>
          <FiArrowLeft size={24} color="#FFF" />
        </Button>
      )}
    </Container>
  )
}

export default LowerSection
