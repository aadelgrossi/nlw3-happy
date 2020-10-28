import React, { useCallback, useState } from 'react'
import dynamic from 'next/dynamic'

import { FiPlus } from 'react-icons/fi'
import { LeafletMouseEvent } from 'leaflet'

import Input from '@/components/Input'
import TextArea from '@/components/TextArea'
import MultipleFileInput from '@/components/MultipleFileInput'

import {
  Container,
  ButtonSelect,
  ConfirmButton,
  Form,
  FormGroup,
  InputBlock,
  MapWrapper,
  MapLegend,
  NewImage
} from './styles'

import Sidebar from '@/components/Sidebar'
import MaskedInput from '@/components/MaskedInput'

interface OrphanageFormData {
  name: string
  about: string
  latitude: number
  longitude: number
  instructions: string
  whatsapp: string
  opening_hours: string
  open_on_weekends: boolean
  image: File[]
}

const MapWithNoSSR = dynamic(() => import('../../../components/Map'), {
  ssr: false
})
const MarkerWithNoSSR = dynamic(() => import('../../../components/Marker'), {
  ssr: false
})

const CreateOrphanage: React.FC = () => {
  const [position, setPosition] = useState({ lat: 0, lng: 0 })
  const [openOnWeekends, setOpenOnWeekends] = useState(true)

  const handleMapClick = useCallback((event: LeafletMouseEvent) => {
    setPosition(event.latlng)
  }, [])

  const handleSubmit = useCallback(async (data: OrphanageFormData) => {
    console.log(data)
  }, [])

  return (
    <Container>
      <Sidebar />

      <main>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <legend>Dados</legend>

            <MapWrapper>
              <MapWithNoSSR
                center={[-23.0794493, -52.4684549]}
                zoom={15}
                style={{
                  width: '100%',
                  height: '280px',
                  borderBottomLeftRadius: '0px',
                  borderBottomRightRadius: '0px',
                  border: 'unset',
                  marginBottom: 0
                }}
                onclick={handleMapClick}
              >
                {position.lat !== 0 && (
                  <MarkerWithNoSSR
                    interactive={false}
                    position={[position.lat, position.lng]}
                  ></MarkerWithNoSSR>
                )}
              </MapWithNoSSR>
              <MapLegend>Clique no mapa para adicionar a localização</MapLegend>
            </MapWrapper>

            <Input name="latitude" type="hidden" value={position.lat}></Input>
            <Input name="longitude" type="hidden" value={position.lng}></Input>

            <InputBlock>
              <Input name="name" label="Nome" />
            </InputBlock>

            <InputBlock>
              <TextArea
                name="about"
                label="Sobre"
                additional_info="Máximo de 300 caracteres"
              />
            </InputBlock>

            <InputBlock>
              <MaskedInput name="whatsapp" label="Número de WhatsApp" />
            </InputBlock>

            <InputBlock>
              <label htmlFor="images">Fotos</label>

              <div className="images-container">
                <NewImage htmlFor="image[]">
                  <FiPlus size={24} color="#15b6d6" />
                </NewImage>

                <MultipleFileInput
                  name="image[]"
                  id="image[]"
                ></MultipleFileInput>
              </div>
            </InputBlock>
          </FormGroup>

          <FormGroup>
            <legend>Visitação</legend>

            <InputBlock>
              <TextArea name="instructions" label="Instruções para visita" />
            </InputBlock>

            <InputBlock>
              <Input name="opening_hours" label="Horários" />
            </InputBlock>

            <InputBlock>
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <ButtonSelect>
                <button
                  type="button"
                  className={openOnWeekends ? 'active' : ''}
                  onClick={() => setOpenOnWeekends(true)}
                >
                  Sim
                </button>
                <button
                  type="button"
                  className={!openOnWeekends ? 'active' : ''}
                  onClick={() => setOpenOnWeekends(false)}
                >
                  Não
                </button>
                <Input
                  name="open_on_weekends"
                  type="hidden"
                  defaultValue={String(openOnWeekends)}
                ></Input>
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
