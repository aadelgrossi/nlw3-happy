import React, { useCallback, useEffect, useState } from 'react'

import api from '@/services/api'
import getValidationErrors from '@/utils/getValidationErrors'
import { FormHandles } from '@unform/core'
import { LatLngExpression, LeafletMouseEvent } from 'leaflet'
import dynamic from 'next/dynamic'
import { FiPlus } from 'react-icons/fi'
import * as Yup from 'yup'

import Input from '../Input'
import Label from '../Label'
import MaskedInput from '../MaskedInput'
import MultipleFileInput from '../MultipleFileInput'
import TextArea from '../TextArea'
import {
  Container,
  FormGroup,
  InputBlock,
  ButtonSelect,
  MapLegend,
  MapWrapper,
  NewImage,
  ImagesContainer
} from './styles'

const MapWithNoSSR = dynamic(() => import('../Map'), {
  ssr: false
})
const MarkerWithNoSSR = dynamic(() => import('../Marker'), {
  ssr: false
})

interface FormProps {
  formRef: React.RefObject<FormHandles>
  onSubmit(data: OrphanageFormData): void
  orphanage?: Orphanage
}

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

const OrphanageForm: React.FC<FormProps> = ({
  formRef,
  children,
  orphanage,
  ...rest
}) => {
  const [openOnWeekends, setOpenOnWeekends] = useState(true)
  const [position, setPosition] = useState<LatLngExpression>([
    -23.0794493,
    -52.4684549
  ])

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      setPosition([coords.latitude, coords.longitude])
    })
  }, [])

  const handleMapClick = useCallback((event: LeafletMouseEvent) => {
    setPosition(event.latlng)
  }, [])

  const validateUniquenessOfName = useCallback(async () => {
    const formData = formRef.current.getData()

    const schema = Yup.object().shape({
      name: Yup.string().test(
        'checkDuplOrphanage',
        'Nome já cadastrado. Digite outro nome.',
        async value => {
          if (value === orphanage.name) {
            return true
          }

          try {
            await api.get(`/orphanages/valid?name=${value}`)
            return true
          } catch (err) {
            return false
          }
        }
      )
    })

    try {
      formRef.current?.setFieldError('name', '')

      await schema.validate(formData, { abortEarly: false })
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err)

        formRef.current?.setErrors(errors)
      }
    }
  }, [])

  return (
    <Container ref={formRef} {...rest}>
      <FormGroup>
        <legend>Dados</legend>

        <InputBlock>
          <Label>Localização</Label>
          <MapWrapper>
            <MapWithNoSSR
              center={
                orphanage ? [orphanage.latitude, orphanage.longitude] : position
              }
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
                position={
                  orphanage
                    ? [orphanage.latitude, orphanage.longitude]
                    : position
                }
              ></MarkerWithNoSSR>
            </MapWithNoSSR>
            <MapLegend>Clique no mapa para adicionar a localização</MapLegend>
          </MapWrapper>

          <Input name="latitude" type="hidden" value={position[0]} />
          <Input name="longitude" type="hidden" value={position[1]} />
        </InputBlock>

        <InputBlock>
          <Label>Nome</Label>
          <Input name="name" onKeyUp={validateUniquenessOfName} />
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

          <ImagesContainer>
            <MultipleFileInput
              name="images[]"
              id="images[]"
              images={orphanage?.images.map(image => image.url)}
            ></MultipleFileInput>

            <NewImage htmlFor="images[]">
              <FiPlus size={24} color="#15b6d6" />
            </NewImage>
          </ImagesContainer>
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
      {children}
    </Container>
  )
}

export default OrphanageForm
