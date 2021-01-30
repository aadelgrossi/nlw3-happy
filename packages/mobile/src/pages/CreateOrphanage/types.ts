export type OrphanageSectionOneFormData = Pick<
  Orphanage,
  'name' | 'about' | 'whatsapp'
> & { images: string[] }

export type OrphanageSectionTwoFormData = Pick<
  Orphanage,
  'instructions' | 'opening_hours'
>
