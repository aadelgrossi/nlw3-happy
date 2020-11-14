import IStorageProviderDTO from '../dtos/IStorageProviderDTO'

export default interface IStorageProvider {
  saveFile(data: IStorageProviderDTO): Promise<string>
  deleteFile(data: IStorageProviderDTO): Promise<void>
}
