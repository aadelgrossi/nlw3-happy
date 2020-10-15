import React from 'react'
import Leaflet, { LatLngExpression } from 'leaflet'
import { Marker as LeafletMarker, Popup } from 'react-leaflet'
import Link from 'next/link'

import { FiArrowRight } from 'react-icons/fi'
const placeholder = Leaflet.icon({
  iconUrl: '/images/map-marker.svg',
  iconSize: [58, 58],
  iconAnchor: [35, 40],
  popupAnchor: [160, 32]
})

interface MarkerProps {
  position: LatLngExpression
}

const Marker: React.FC<MarkerProps> = ({ position }) => {
  return (
    <LeafletMarker position={position} icon={placeholder}>
      <Popup
        closeButton={false}
        minWidth={240}
        maxWidth={240}
        className="map-popup"
      >
        Lar das meninas
        <Link href="">
          <a>
            <FiArrowRight size={32} color="#fff"></FiArrowRight>
          </a>
        </Link>
      </Popup>
    </LeafletMarker>
  )
}

export default Marker
