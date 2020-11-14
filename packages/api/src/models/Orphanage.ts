import slugify from 'slugify'
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
  BeforeInsert,
  BeforeUpdate
} from 'typeorm'

import Image from '~/models/Image'

@Entity('orphanages')
class Orphanage {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column()
  latitude: number

  @Column()
  longitude: number

  @Column()
  about: string

  @Column()
  instructions: string

  @Column()
  opening_hours: string

  @Column()
  open_on_weekends: boolean

  @Column()
  whatsapp: string

  @Column()
  approved: boolean

  @Column()
  slug: string

  @BeforeInsert()
  @BeforeUpdate()
  slugifyName(): void {
    this.slug = slugify(this.name, { lower: true })
  }

  @OneToMany(() => Image, image => image.orphanage, {
    cascade: ['insert', 'update']
  })
  @JoinColumn({ name: 'orphanage_id' })
  images: Image[]
}

export default Orphanage
