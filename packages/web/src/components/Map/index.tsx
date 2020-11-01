import React from 'react'

import { Map as LeafletMap, TileLayer, MapProps } from 'react-leaflet'

const Map: React.FC<MapProps> = ({ children, ...rest }) => {
  return (
    <LeafletMap {...rest}>
      {children}
      <TileLayer
        url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.NEXT_PUBLIC_MAP_BOX_TOKEN}`}
      ></TileLayer>
    </LeafletMap>
  )
}

export default Map
