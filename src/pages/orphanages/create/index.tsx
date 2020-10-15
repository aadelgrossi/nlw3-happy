import React from 'react'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'

import { FiArrowLeft, FiPlus } from 'react-icons/fi'
import MapMarker from '../../../assets/map-marker.svg'

import {
  Container,
  ButtonSelect,
  ConfirmButton,
  Form,
  FormGroup,
  InputBlock,
  NewImage
} from './styles'

import Sidebar from '@/components/Sidebar'
const MapWithNoSSR = dynamic(() => import('../../../components/Map'), {
  ssr: false
})
const MarkerWithNoSSR = dynamic(() => import('../../../components/Marker'), {
  ssr: false
})

const CreateOrphanage: React.FC = () => {
  return (
    <Container>
      <Sidebar />

      <main>
        <Form className="create-orphanage-form">
          <FormGroup>
            <legend>Dados</legend>

            <MapWithNoSSR
              center={[-23.0794493, -52.4684549]}
              zoom={15}
              style={{ width: '100%', height: '280px' }}
            >
              <MarkerWithNoSSR
                position={[-23.0794617, -52.4674024]}
              ></MarkerWithNoSSR>
            </MapWithNoSSR>

            <InputBlock>
              <label htmlFor="name">Nome</label>
              <input id="name" />
            </InputBlock>

            <InputBlock>
              <label htmlFor="about">
                Sobre <span>Máximo de 300 caracteres</span>
              </label>
              <textarea id="name" maxLength={300} />
            </InputBlock>

            <InputBlock>
              <label htmlFor="images">Fotos</label>

              <div className="uploaded-image"></div>

              <NewImage>
                <FiPlus size={24} color="#15b6d6" />
              </NewImage>
            </InputBlock>
          </FormGroup>

          <FormGroup>
            <legend>Visitação</legend>

            <InputBlock>
              <label htmlFor="instructions">Instruções</label>
              <textarea id="instructions" />
            </InputBlock>

            <InputBlock>
              <label htmlFor="opening_hours">Nome</label>
              <input id="opening_hours" />
            </InputBlock>

            <InputBlock>
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <ButtonSelect>
                <button type="button" className="active">
                  Sim
                </button>
                <button type="button">Não</button>
              </ButtonSelect>
            </InputBlock>
          </FormGroup>

          <ConfirmButton type="submit">Confirmar</ConfirmButton>
        </Form>
      </main>
    </Container>
  )
}

export default CreateOrphanage
