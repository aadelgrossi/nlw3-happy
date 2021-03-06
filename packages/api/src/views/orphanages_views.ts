import imagesView from './images_view'
import Orphanage from '~/models/Orphanage'

interface OrphanageOutput {
  id: string
  name: string
  latitude: number
  longitude: number
  about: string
  whatsapp: string
  instructions: string
  opening_hours: string
  open_on_weekends: boolean
  slug: string
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
      latitude: Number(orphanage.latitude),
      longitude: Number(orphanage.longitude),
      about: orphanage.about,
      whatsapp: orphanage.whatsapp,
      instructions: orphanage.instructions,
      opening_hours: orphanage.opening_hours,
      open_on_weekends: orphanage.open_on_weekends,
      slug: orphanage.slug,
      images: imagesView.renderMany(orphanage.images)
    }
  },

  renderMany(orphanages: Orphanage[]): OrphanageOutput[] {
    return orphanages.map(orphanage => this.render(orphanage))
  }
}
