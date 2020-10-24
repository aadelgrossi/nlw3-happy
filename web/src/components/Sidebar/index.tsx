import React, { useCallback, useState } from 'react'

import { Container, Footer, Menu, Button } from './styles'

import MapMarker from '../../assets/map-marker.svg'
import { FiAlertCircle, FiArrowLeft, FiMapPin, FiPower } from 'react-icons/fi'
import { useRouter } from 'next/router'
import { useAuth } from '@/hooks/auth'
import { useToast } from '@/hooks/toast'
import Link from 'next/link'

const Sidebar: React.FC = () => {
  const [hasUnseenNotifications, setHasUnseenNotifications] = useState(true)
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
      <MapMarker />

      <Menu>
        <Link href="/dashboard">
          <Button className={router.pathname === '/dashboard' ? 'active' : ''}>
            <FiMapPin size={24} color="#FFF" />
          </Button>
        </Link>

        <Link href="/dashboard/pending">
          <Button
            className={router.pathname === '/dashboard/pending' ? 'active' : ''}
          >
            <span className={hasUnseenNotifications ? 'unseen' : 'seen'} />
            <FiAlertCircle size={24} color="#FFF" />
          </Button>
        </Link>
      </Menu>

      <Footer>
        {router.pathname === '/dashboard' ? (
          <button type="button" onClick={handleSignOut}>
            <FiPower size={24} color="#FFF" />
          </button>
        ) : (
          <button type="button" onClick={() => router.push('/dashboard')}>
            <FiArrowLeft size={24} color="#FFF" />
          </button>
        )}
      </Footer>
    </Container>
  )
}

export default Sidebar
