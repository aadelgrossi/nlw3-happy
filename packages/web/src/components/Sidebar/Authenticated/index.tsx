import React, { useCallback, useState, useEffect } from 'react'

import api from '@/services/api'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FiAlertCircle, FiMapPin } from 'react-icons/fi'

import MapMarker from '../../../assets/map-marker.svg'
import LowerSection from '../LowerSection'
import { Container } from '../styles'
import { Menu, MenuButton } from './styles'

const AuthenticatedSidebar: React.FC = () => {
  const router = useRouter()
  const [hasPendingOrphanages, setHasPendingOrphanages] = useState(false)

  const checkIfPendingOrphanages = useCallback(async () => {
    const response = await api.get<Orphanage[]>('orphanages/pending')
    if (response.data.length) {
      setHasPendingOrphanages(true)
    }
  }, [])

  useEffect(() => {
    checkIfPendingOrphanages()
  }, [checkIfPendingOrphanages])

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
            <span className={hasPendingOrphanages ? 'unseen' : 'seen'} />
            <FiAlertCircle size={24} color="#FFF" />
          </MenuButton>
        </Link>
      </Menu>

      <LowerSection />
    </Container>
  )
}

export default AuthenticatedSidebar
