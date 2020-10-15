import React from 'react'
import { LatLngExpression } from 'leaflet'
import { Map as LeafletMap, TileLayer } from 'react-leaflet'

interface MapProps {
  center: LatLngExpression
  zoom: number
  style?: Record<string, unknown>
}

const Map: React.FC<MapProps> = ({ center, zoom, children }) => {
  return (
    <LeafletMap
      center={center}
      zoom={zoom}
      style={{ width: '100%', height: '100%' }}
    >
      {children}
      <TileLayer
        url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.NEXT_PUBLIC_MAP_BOX_TOKEN}`}
      ></TileLayer>
    </LeafletMap>
  )
}

export default Map
