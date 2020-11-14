import { injectable, inject } from 'tsyringe'

import IStorageProvider from '~/providers/StorageProvider/models/IStorageProvider'

interface IFileRequest {
  filename: string
}

@injectable()
class FileUploadService {
  constructor(
    @inject('StorageProvider')
    private storageProvider: IStorageProvider
  ) {}

  public async execute({ filename }: IFileRequest): Promise<string> {
    return await this.storageProvider.saveFile({
      filename
    })
  }
}

export default FileUploadService
