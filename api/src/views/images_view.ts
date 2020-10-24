import Image from '~/models/Image'

interface ImageOutput {
  id: string
  url: string
}

export default {
  render(image: Image): ImageOutput {
    return {
      id: image.id,
      url: `${process.env.APP_URL}/uploads/${image.path}`
    }
  },

  renderMany(images: Image[]): ImageOutput[] {
    return images.map(image => this.render(image))
  }
}
