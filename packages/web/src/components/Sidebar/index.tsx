import React, { useCallback, useState } from 'react'

import { useAuth } from '@/hooks/auth'
import { useToast } from '@/hooks/toast'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FiAlertCircle, FiArrowLeft, FiMapPin, FiPower } from 'react-icons/fi'

import MapMarker from '../../assets/map-marker.svg'
import { Container, Footer, Menu, Button } from './styles'

const Sidebar: React.FC = () => {
  const [hasUnseenNotifications, setHasUnseenNotifications] = useState(true)
  const router = useRouter()
  const { signOut, isAuthenticated } = useAuth()
  const { addToast } = useToast()

  const handleSignOut = useCallback(() => {
    signOut()
    addToast({ title: 'Sessão encerrada', type: 'info' })
    router.push('/signin')
  }, [])

  return (
    <Container>
      <MapMarker />

      {isAuthenticated && (
        <Menu>
          <Link href="/dashboard">
            <Button
              className={router.pathname === '/dashboard' ? 'active' : ''}
            >
              <FiMapPin size={24} color="#FFF" />
            </Button>
          </Link>

          <Link href="/dashboard/pending">
            <Button
              className={
                router.pathname === '/dashboard/pending' ? 'active' : ''
              }
            >
              <span className={hasUnseenNotifications ? 'unseen' : 'seen'} />
              <FiAlertCircle size={24} color="#FFF" />
            </Button>
          </Link>
        </Menu>
      )}

      <Footer>
        {router.pathname === '/dashboard' ? (
          <button type="button" onClick={handleSignOut}>
            <FiPower size={24} color="#FFF" />
          </button>
        ) : (
          <button type="button" onClick={() => router.back}>
            <FiArrowLeft size={24} color="#FFF" />
          </button>
        )}
      </Footer>
    </Container>
  )
}

export default Sidebar
