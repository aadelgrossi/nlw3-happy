import fs from 'fs'
import path from 'path'

import aws, { S3 } from 'aws-sdk'
import mime from 'mime'

import IStorageProviderDTO from '../dtos/IStorageProviderDTO'
import IStorageProvider from '../models/IStorageProvider'
import uploadConfig from '~/config/upload'

export default class S3StorageProvider implements IStorageProvider {
  private client: S3

  constructor() {
    this.client = new aws.S3({
      region: process.env.AWS_DEFAULT_REGION
    })
  }

  public async saveFile({ filename }: IStorageProviderDTO): Promise<string> {
    const originalPath = path.resolve(uploadConfig.tmpFolder, filename)
    const ContentType = mime.getType(originalPath)

    if (!ContentType) {
      throw new Error('File not found')
    }
    const fileContent = await fs.promises.readFile(originalPath)

    await this.client
      .putObject({
        Bucket: uploadConfig.config.aws.bucket,
        Key: filename,
        ACL: 'public-read',
        Body: fileContent,
        ContentType,
        ContentDisposition: `inline; filename=${filename}`
      })
      .promise()

    await fs.promises.unlink(originalPath)

    return filename
  }

  public async deleteFile({ filename }: IStorageProviderDTO): Promise<void> {
    await this.client
      .deleteObject({
        Bucket: uploadConfig.config.aws.bucket,
        Key: filename
      })
      .promise()
  }
}
