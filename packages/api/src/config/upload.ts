import crypto from 'crypto'
import path from 'path'

import multer, { StorageEngine } from 'multer'

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp')

interface IUploadConfig {
  driver: 'disk' | 's3'
  tmpFolder: string
  uploadsFolder: string
  multer: {
    storage: StorageEngine
  }
  config: {
    disk: unknown
    aws: {
      bucket: string
    }
  }
}

export default {
  driver: process.env.STORAGE_DRIVER,
  tmpFolder,
  uploadsFolder: path.resolve(tmpFolder, 'uploads'),

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
  },
  config: {
    disk: {},
    aws: {
      bucket: process.env.AWS_BUCKET_NAME
    }
  }
} as IUploadConfig
