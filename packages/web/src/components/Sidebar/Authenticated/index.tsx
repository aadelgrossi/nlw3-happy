import React, { useState } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/router'
import { FiAlertCircle, FiMapPin } from 'react-icons/fi'

import MapMarker from '../../../assets/map-marker.svg'
import LowerSection from '../LowerSection'
import { Container } from '../styles'
import { Menu, MenuButton } from './styles'

const AuthenticatedSidebar: React.FC = () => {
  const [hasUnseenNotifications, setHasUnseenNotifications] = useState(true)
  const router = useRouter()

  return (
    <Container>
      <MapMarker />

      <Menu>
        <Link href="/dashboard">
          <MenuButton
            className={router.pathname === '/dashboard' ? 'active' : ''}
          >
            <FiMapPin size={24} color="#FFF" />
          </MenuButton>
        </Link>

        <Link href="/dashboard/pending">
          <MenuButton
            className={router.pathname === '/dashboard/pending' ? 'active' : ''}
          >
            <span className={hasUnseenNotifications ? 'unseen' : 'seen'} />
            <FiAlertCircle size={24} color="#FFF" />
          </MenuButton>
        </Link>
      </Menu>

      <LowerSection />
    </Container>
  )
}

export default AuthenticatedSidebar
