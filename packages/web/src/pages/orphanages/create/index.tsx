import React, { useCallback, useEffect, useRef, useState } from 'react'

import Input from '@/components/Input'
import Label from '@/components/Label'
import MaskedInput from '@/components/MaskedInput'
import MultipleFileInput from '@/components/MultipleFileInput'
import Sidebar from '@/components/Sidebar'
import TextArea from '@/components/TextArea'
// import { useToast } from '@/hooks/toast'
import api from '@/services/api'
import getValidationErrors from '@/utils/getValidationErrors'
import { FormHandles } from '@unform/core'
import { LatLngExpression, LeafletMouseEvent } from 'leaflet'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { FiPlus } from 'react-icons/fi'
import * as Yup from 'yup'

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
  const [position, setPosition] = useState<LatLngExpression>([
    -23.0794493,
    -52.4684549
  ])
  const [openOnWeekends, setOpenOnWeekends] = useState(true)

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
        'Nome do orfanato já está cadastrado na plataforma. Escolha outro',
        async value => {
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

  const handleSubmit = useCallback(async (data: OrphanageFormData) => {
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
    try {
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
      <Head>
        <title>Happy | Cadastrar orfanato</title>
      </Head>

      <Sidebar />

      <main>
        <Form ref={formRef} onSubmit={handleSubmit}>
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
                  <MarkerWithNoSSR
                    interactive={false}
                    position={position}
                  ></MarkerWithNoSSR>
                </MapWithNoSSR>
                <MapLegend>
                  Clique no mapa para adicionar a localização
                </MapLegend>
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
