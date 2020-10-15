import React from 'react'
import { Marker as LeafletMarker, Popup, MarkerProps } from 'react-leaflet'
import Link from 'next/link'

import { FiArrowRight } from 'react-icons/fi'
import mapIcon from '@/utils/mapIcon'

const Marker: React.FC<MarkerProps> = ({ ...rest }) => {
  return (
    <LeafletMarker {...rest} icon={mapIcon}>
      <Popup
        closeButton={false}
        minWidth={240}
        maxWidth={240}
        className="map-popup"
      >
        Lar das meninas
        <Link href="/orphanages/base">
          <a>
            <FiArrowRight size={32} color="#fff"></FiArrowRight>
          </a>
        </Link>
      </Popup>
    </LeafletMarker>
  )
}

export default Marker
