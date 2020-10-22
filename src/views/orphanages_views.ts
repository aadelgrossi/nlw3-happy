import Orphanage from '~/models/Orphanage'
import imagesView from './images_view'

interface OrphanageOutput {
  id: string
  name: string
  latitude: number
  longitude: number
  about: string
  instructions: string
  opening_hours: string
  open_on_weekends: boolean
  images: Array<{
    id: string
    url: string
  }>
}

export default {
  render(orphanage: Orphanage): OrphanageOutput {
    return {
      id: orphanage.id,
      name: orphanage.name,
      latitude: orphanage.latitude,
      longitude: orphanage.longitude,
      about: orphanage.about,
      instructions: orphanage.instructions,
      opening_hours: orphanage.opening_hours,
      open_on_weekends: orphanage.open_on_weekends,
      images: imagesView.renderMany(orphanage.images)
    }
  },

  renderMany(orphanages: Orphanage[]): OrphanageOutput[] {
    return orphanages.map(orphanage => this.render(orphanage))
  }
}
