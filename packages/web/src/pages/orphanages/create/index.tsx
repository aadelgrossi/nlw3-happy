import React, { useCallback, useRef, useState } from 'react'
import dynamic from 'next/dynamic'

import { FiPlus } from 'react-icons/fi'
import { LeafletMouseEvent } from 'leaflet'
import * as Yup from 'yup'

import Input from '@/components/Input'
import TextArea from '@/components/TextArea'
import MultipleFileInput from '@/components/MultipleFileInput'
import Label from '@/components/Label'

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
import { useToast } from '@/hooks/toast'
import { FormHandles } from '@unform/core'
import getValidationErrors from '@/utils/getValidationErrors'
import api from '@/services/api'
// import { useRouter } from 'next/router'

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
  // const { addToast } = useToast()
  // const router = useRouter()
  const formRef = useRef<FormHandles>(null)
  const [position, setPosition] = useState({
    lat: -23.0794493,
    lng: -52.4684549
  })
  const [openOnWeekends, setOpenOnWeekends] = useState(true)

  const handleMapClick = useCallback((event: LeafletMouseEvent) => {
    setPosition(event.latlng)
  }, [])

  const handleSubmit = useCallback(async (data: OrphanageFormData) => {
    try {
      console.log(data)

      formRef.current?.setErrors({})

      const schema = Yup.object().shape({
        name: Yup.string().required('Campo obrigatório'),
        about: Yup.string().required('Campo obrigatório'),
        latitude: Yup.number().required(),
        longitude: Yup.number().required(),
        whatsapp: Yup.string()
          .matches(
            /\(([0-9]){2}\) ([0-9]){5}-([0-9]){4}/,
            'Digite um número valido (xx) xxxxx-xxxx'
          )
          .required('Campo obrigatório'),
        instructions: Yup.string().required('Campo obrigatório'),
        opening_hours: Yup.string().required('Campo obrigatório'),
        open_on_weekends: Yup.boolean().required()
      })

      await schema.validate(data, { abortEarly: false })

      // addToast({
      //   title: 'Sucesso!',
      //   type: 'success',
      //   description: 'Orfanato cadastrado com sucesso'
      // })
      // router.push('/map')
      await api.post('/orphanages', data)
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        console.log(data)
        const errors = getValidationErrors(err)

        console.log(errors)
        formRef.current?.setErrors(errors)
      }

      // addToast({
      //   title: 'Ocorreu um erro',
      //   type: 'error',
      //   description: 'A validação falhou. Favor revise os dados'
      // })
    }
  }, [])

  return (
    <Container>
      <Sidebar />

      <main>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <FormGroup>
            <legend>Dados</legend>

            <InputBlock>
              <Label>Localização</Label>
              <MapWrapper>
                <MapWithNoSSR
                  center={[position.lat, position.lng]}
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
                  <MarkerWithNoSSR
                    interactive={false}
                    position={[position.lat, position.lng]}
                  ></MarkerWithNoSSR>
                </MapWithNoSSR>
                <MapLegend>
                  Clique no mapa para adicionar a localização
                </MapLegend>
              </MapWrapper>

              <Input name="latitude" type="hidden" value={position.lat} />
              <Input name="longitude" type="hidden" value={position.lng} />
            </InputBlock>

            <InputBlock>
              <Label>Nome</Label>
              <Input name="name" />
            </InputBlock>

            <InputBlock>
              <Label>
                Sobre <span>Máximo de 300 caracteres</span>
              </Label>
              <TextArea name="about" />
            </InputBlock>

            <InputBlock>
              <Label> Whatsapp</Label>
              <MaskedInput name="whatsapp" />
            </InputBlock>

            <InputBlock>
              <Label>Fotos</Label>

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
              <Label>Instruções para visita</Label>
              <TextArea name="instructions" />
            </InputBlock>

            <InputBlock>
              <Label>Horários</Label>
              <Input name="opening_hours" />
            </InputBlock>

            <InputBlock>
              <Label>Atende fim de semana</Label>

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
