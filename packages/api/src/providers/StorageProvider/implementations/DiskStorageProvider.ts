import fs from 'fs'
import path from 'path'

import IStorageProviderDTO from '../dtos/IStorageProviderDTO'
import IStorageProvider from '../models/IStorageProvider'
import uploadConfig from '~/config/upload'

export default class DiskStorageProvider implements IStorageProvider {
  public async saveFile({ filename }: IStorageProviderDTO): Promise<string> {
    await fs.promises.rename(
      path.resolve(uploadConfig.tmpFolder, filename),
      path.resolve(uploadConfig.uploadsFolder, filename)
    )

    return filename
  }

  public async deleteFile({ filename }: IStorageProviderDTO): Promise<void> {
    const filePath = path.resolve(uploadConfig.uploadsFolder, filename)

    try {
      await fs.promises.stat(filePath)
    } catch {
      return
    }

    await fs.promises.unlink(filePath)
  }
}
