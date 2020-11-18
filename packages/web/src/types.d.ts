interface Orphanage {
  id: string
  latitude: number
  longitude: number
  about: string
  name: string
  slug: string
  instructions: string
  whatsapp: string
  opening_hours: string
  open_on_weekends: boolean
  images: Array<{
    id: string
    url: string
  }>
}
