import uploadConfig from '~/config/upload'
import Image from '~/models/Image'

interface ImageOutput {
  id: string
  url: string
}

const urlFormatter = {
  disk: (name: string) =>
    `${process.env.API_URL}/uploads/${encodeURIComponent(name)}`,
  s3: (name: string) =>
    `https://${uploadConfig.config.aws.bucket}.s3.amazonaws.com/${name}`
}

export default {
  render(image: Image): ImageOutput {
    return {
      id: image.id,
      url: urlFormatter[uploadConfig.driver](image.path)
    }
  },

  renderMany(images: Image[]): ImageOutput[] {
    return images.map(image => this.render(image))
  }
}
