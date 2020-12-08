import React from 'react'

import Sidebar from '@/components/Sidebar'
import api from '@/services/api'
import { GetStaticPaths, GetStaticProps } from 'next'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { FaWhatsapp } from 'react-icons/fa'
import { FiClock, FiInfo } from 'react-icons/fi'
import { Carousel } from 'react-responsive-carousel'

import {
  Container,
  OrphanageDetails,
  OrphanageContent,
  MapContainer,
  OpenDetails,
  SliderIndicator
} from './styles'

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
  whatsapp: string
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
  return (
    <Container>
      <Head>
        <title>Happy | {orphanage.name}</title>
      </Head>
      <Sidebar />

      <main>
        <OrphanageDetails>
          {orphanage.images && (
            <Carousel
              showStatus={false}
              showThumbs={false}
              renderIndicator={(onClickHandler, isSelected) => (
                <SliderIndicator isSelected={isSelected} />
              )}
            >
              {orphanage.images.map(image => (
                <div key={image.id}>
                  <Image
                    src={image.url}
                    alt={orphanage.name}
                    layout="intrinsic"
                    loading="eager"
                    width={700}
                    height={400}
                  />
                </div>
              ))}
            </Carousel>
          )}

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

            <Link
              href={`http://api.whatsapp.com/send/?phone=${orphanage.whatsapp}&text`}
            >
              <button type="button" className="contact-button">
                <FaWhatsapp size={20} color="#FFF" />
                Entrar em contato
              </button>
            </Link>
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
