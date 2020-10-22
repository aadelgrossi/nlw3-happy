import path from 'path'
import crypto from 'crypto'
import multer, { StorageEngine } from 'multer'

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp', 'uploads')

interface IUploadConfig {
  driver: 'disk' | 's3'
  multer: {
    storage: StorageEngine
  }
}

export default {
  driver: process.env.STORAGE_DRIVER,
  multer: {
    directory: tmpFolder,
    storage: multer.diskStorage({
      destination: tmpFolder,
      filename(request, file, callback) {
        const fileHash = crypto.randomBytes(10).toString('hex')
        const fileName = `${fileHash}-${file.originalname}`

        return callback(null, fileName)
      }
    })
  }
} as IUploadConfig
