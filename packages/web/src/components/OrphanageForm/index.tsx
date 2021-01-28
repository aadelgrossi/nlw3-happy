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
  validate?(): void
  orphanage?: Orphanage
}

export interface OrphanageFormData {
  name: string
  about: string
  latitude: number
  longitude: number
  instructions: string
  whatsapp: string
  opening_hours: string
  open_on_weekends: boolean
  files: {
    [key: string]: FileList
  }
}

const OrphanageForm: React.FC<FormProps> = ({
  formRef,
  children,
  orphanage,
  validate = () => {},
  ...rest
}) => {
  const [openOnWeekends, setOpenOnWeekends] = useState(() =>
    orphanage ? orphanage.open_on_weekends : true
  )
  const [position, setPosition] = useState<LatLngExpression>(() =>
    orphanage
      ? [orphanage.latitude, orphanage.longitude]
      : [-23.0794493, -52.4684549]
  )

  useEffect(() => {
    if (!orphanage) {
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        setPosition([coords.latitude, coords.longitude])
      })
    }
  }, [orphanage])

  const handleMapClick = useCallback(
    (event: LeafletMouseEvent) => {
      setPosition(event.latlng)
      formRef.current.setFieldValue('latitude', event.latlng.lat)
      formRef.current.setFieldValue('longitude', event.latlng.lng)
    },
    [formRef]
  )

  const validateUniquenessOfName = useCallback(async () => {
    const formData = formRef.current.getData()

    const schema = Yup.object().shape({
      name: Yup.string().test(
        'checkDuplOrphanage',
        'Nome já cadastrado. Digite outro nome.',
        async value => {
          if (value === orphanage?.name) {
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
  }, [formRef, orphanage?.name])

  const handleNameValidations = useCallback(async () => {
    validate()
    validateUniquenessOfName()
  }, [validate, validateUniquenessOfName])

  return (
    <Container ref={formRef} {...rest}>
      <FormGroup>
        <legend>Dados</legend>

        <InputBlock>
          <Label>Localização</Label>
          <MapWrapper>
            <MapWithNoSSR
              center={position}
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
              <MarkerWithNoSSR interactive={false} position={position} />
            </MapWithNoSSR>
            <MapLegend>Clique no mapa para adicionar a localização</MapLegend>
          </MapWrapper>

          <Input name="latitude" type="hidden" value={position[0]} />
          <Input name="longitude" type="hidden" value={position[1]} />
        </InputBlock>

        <InputBlock>
          <Label>Nome</Label>
          <Input name="name" onKeyUp={handleNameValidations} />
        </InputBlock>

        <InputBlock>
          <Label>
            Sobre <span>Máximo de 300 caracteres</span>
          </Label>
          <TextArea name="about" onKeyUp={validate} />
        </InputBlock>

        <InputBlock>
          <Label> Whatsapp</Label>
          <MaskedInput name="whatsapp" onKeyUp={validate} />
        </InputBlock>

        <InputBlock>
          <Label>Fotos</Label>

          <ImagesContainer>
            <MultipleFileInput
              name="files[]"
              id="files[]"
              images={orphanage?.images.map(image => image.url)}
            />

            <NewImage htmlFor="files[]">
              <FiPlus size={24} color="#15b6d6" />
            </NewImage>
          </ImagesContainer>
        </InputBlock>
      </FormGroup>

      <FormGroup>
        <legend>Visitação</legend>

        <InputBlock>
          <Label>Instruções para visita</Label>
          <TextArea name="instructions" onKeyUp={validate} />
        </InputBlock>

        <InputBlock>
          <Label>Horários</Label>
          <Input name="opening_hours" onKeyUp={validate} />
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
