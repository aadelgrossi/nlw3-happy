import React, { useState } from 'react'
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
  slug: string
  instructions: string
  opening_hours: string
  open_on_weekends: boolean
  images: Array<{
    id: string
    url: string
  }>
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

const ShowOrphanage: React.FC<OrphanageProps> = ({ orphanage }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0)

  return (
    <Container>
      <Sidebar />

      <main>
        <OrphanageDetails>
          <img
            src={orphanage.images[activeImageIndex].url}
            alt={orphanage.name}
          />

          <Images>
            {orphanage.images.map((image, index) => (
              <button
                key={image.id}
                className={activeImageIndex === index ? 'active' : ''}
                type="button"
                onClick={() => {
                  setActiveImageIndex(index)
                }}
              >
                <img src={image.url} alt={orphanage.name} />
              </button>
            ))}
          </Images>

          <OrphanageContent>
            <h1>{orphanage.name}</h1>
            <p>{orphanage.about}</p>

            <MapContainer>
              <MapWithNoSSR
                center={[orphanage.latitude, orphanage.longitude]}
                zoom={16}
                style={{ width: '100%', height: 280 }}
                dragging={false}
                touchZoom={false}
                zoomControl={false}
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
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`https://www.google.com/maps/dir/?api=1&destination=${orphanage.latitude},${orphanage.longitude}`}
                >
                  Ver rotas no Google Maps
                </a>
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
              {orphanage.open_on_weekends ? (
                <div className="open-on-weekends">
                  <FiInfo size={32} color="#39CC83" />
                  Abrimos <br />
                  fim de semana
                </div>
              ) : (
                <div className="closed-on-weekends">
                  <FiInfo size={32} color="#ff6690" />
                  Não abrimos <br />
                  fim de semana
                </div>
              )}
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

export default ShowOrphanage

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await api.get('/orphanages')

  const paths = response.data.map((orphanage: Orphanage) => {
    return { params: { slug: orphanage.slug } }
  })

  console.log(paths)

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async context => {
  const { slug } = context.params

  const response = await api.get(`/orphanages/${slug}`)

  return {
    props: {
      orphanage: response.data
    }
  }
}