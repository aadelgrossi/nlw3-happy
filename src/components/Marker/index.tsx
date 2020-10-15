import React from 'react'
import Leaflet from 'leaflet'
import { Marker as LeafletMarker, Popup, MarkerProps } from 'react-leaflet'
import Link from 'next/link'

import { FiArrowRight } from 'react-icons/fi'

const placeholder = Leaflet.icon({
  iconUrl: '/images/map-marker.svg',
  iconSize: [58, 58],
  iconAnchor: [35, 40],
  popupAnchor: [160, 32]
})

const Marker: React.FC<MarkerProps> = ({ ...rest }) => {
  return (
    <LeafletMarker {...rest} icon={placeholder}>
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
