import Leaflet from 'leaflet'

const mapIcon = Leaflet.icon({
  iconUrl: '/images/map-marker.svg',
  iconSize: [58, 58],
  iconAnchor: [35, 40],
  popupAnchor: [160, 32]
})

export default mapIcon
