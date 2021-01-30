declare module '*.png'

interface Orphanage {
  id: string
  name: string
  latitude: number
  longitude: number
  about: string
  whatsapp: string
  instructions: string
  opening_hours: string
  open_on_weekends: boolean
  images: Array<{
    id: string
    url: string
  }>
}

interface OrphanagePartialFormData {
  name: string
  latitude: number
  longitude: number
  about: string
  whatsapp: string
  images: string[]
}
