import React from 'react'
import { FaWhatsapp } from 'react-icons/fa'
import { FiClock, FiInfo } from 'react-icons/fi'
import dynamic from 'next/dynamic'

import {
  Container,
  OrphanageDetails,
  OrphanageContent,
  Images,
  MapContainer,
  OpenDetails
} from './styles'
import Sidebar from '@/components/Sidebar'
import api from '@/services/api'
import { GetStaticPaths, GetStaticProps } from 'next'

interface Orphanage {
  id: string
  latitude: number
  longitude: number
  about: string
  name: string
  instructions: string
  opening_hours: string
  open_on_weekends: boolean
}

interface OrphanageProps {
  orphanage: Orphanage
}

const MapWithNoSSR = dynamic(() => import('../../../components/Map'), {
  ssr: false
})
const MarkerWithNoSSR = dynamic(() => import('../../../components/Marker'), {
  ssr: false
})

const Orphanage: React.FC<OrphanageProps> = ({ orphanage }) => {
  return (
    <Container>
      <Sidebar />

      <main>
        <OrphanageDetails>
          <img
            src="https://www.gcd.com.br/wp-content/uploads/2020/08/safe_image.jpg"
            alt="Lar das meninas"
          />

          <Images>
            <button className="active" type="button">
              <img
                src="https://www.gcd.com.br/wp-content/uploads/2020/08/safe_image.jpg"
                alt="Lar das meninas"
              />
            </button>
            <button type="button">
              <img
                src="https://www.gcd.com.br/wp-content/uploads/2020/08/safe_image.jpg"
                alt="Lar das meninas"
              />
            </button>
            <button type="button">
              <img
                src="https://www.gcd.com.br/wp-content/uploads/2020/08/safe_image.jpg"
                alt="Lar das meninas"
              />
            </button>
            <button type="button">
              <img
                src="https://www.gcd.com.br/wp-content/uploads/2020/08/safe_image.jpg"
                alt="Lar das meninas"
              />
            </button>
            <button type="button">
              <img
                src="https://www.gcd.com.br/wp-content/uploads/2020/08/safe_image.jpg"
                alt="Lar das meninas"
              />
            </button>
            <button type="button">
              <img
                src="https://www.gcd.com.br/wp-content/uploads/2020/08/safe_image.jpg"
                alt="Lar das meninas"
              />
            </button>
          </Images>

          <OrphanageContent>
            <h1>{orphanage.name}</h1>
            <p>{orphanage.about}</p>

            <MapContainer>
              <MapWithNoSSR
                center={[-23.0878701, -52.4666419]}
                zoom={13}
                style={{ width: '100%', height: 280 }}
                dragging={false}
                touchZoom={false}
                zoomControl={true}
                scrollWheelZoom={false}
                doubleClickZoom={false}
              >
                <MarkerWithNoSSR
                  name={orphanage.name}
                  interactive={false}
                  position={[orphanage.latitude, orphanage.longitude]}
                />
              </MapWithNoSSR>

              <footer>
                <a href="">Ver rotas no Google Maps</a>
              </footer>
            </MapContainer>

            <hr />

            <h2>Instruções para visita</h2>
            <p>{orphanage.instructions}</p>

            <OpenDetails>
              <div className="hour">
                <FiClock size={32} color="#15B6D6" />
                Segunda à Sexta <br />
                {orphanage.opening_hours}
              </div>
              <div className="open-on-weekends">
                <FiInfo size={32} color="#39CC83" />
                Atendemos <br />
                fim de semana
              </div>
            </OpenDetails>

            <button type="button" className="contact-button">
              <FaWhatsapp size={20} color="#FFF" />
              Entrar em contato
            </button>
          </OrphanageContent>
        </OrphanageDetails>
      </main>
    </Container>
  )
}

export default Orphanage

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await api.get('/orphanages')

  const paths = response.data.map(orphanage => {
    return { params: { id: orphanage.id } }
  })
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async context => {
  const { id } = context.params

  const response = await api.get(`/orphanages/${id}`)

  return {
    props: {
      orphanage: response.data
    }
  }
}
