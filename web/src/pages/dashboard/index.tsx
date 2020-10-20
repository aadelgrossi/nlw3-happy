// import { useAuth } from '@/hooks/auth'
import { useAuth } from '@/hooks/auth'
import React from 'react'

import { Container } from './styles'

interface User {
  id: string
  name: string
  email: string
}

interface UserProps {
  user: User
}

const Dashboard: React.FC<UserProps> = () => {
  const { isAuthenticated, user } = useAuth()

  return (
    <Container>
      <h1>dashboard</h1>
      <p>Estou autenticado? {isAuthenticated ? 'Sim' : 'não'}</p>
      {user && user.email}
    </Container>
  )
}

export default Dashboard
