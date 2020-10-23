import Sidebar from '@/components/Sidebar'
import React, { useState } from 'react'

import SadFace from '../../../assets/logo-sad.svg'

import {
  Container,
  Contents,
  Header,
  Separator,
  OrphanagesContainer,
  NoOrphanages
} from './styles'

const Pending: React.FC = () => {
  const [orphanages, setOrphanages] = useState([])
  return (
    <Container>
      <Sidebar />

      <Contents>
        <Header>
          <h1>Cadastros pendentes</h1>
          {orphanages.length > 0 && (
            <span>
              {orphanages.length} orfanato{orphanages.length > 1 ? 's' : ''}
            </span>
          )}
        </Header>
        <Separator />

        <OrphanagesContainer>
          {!orphanages.length && (
            <NoOrphanages>
              <SadFace />
              Nenhum no momento
            </NoOrphanages>
          )}
        </OrphanagesContainer>
      </Contents>
    </Container>
  )
}

export default Pending
