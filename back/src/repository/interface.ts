import { Token } from 'typedi'
import { Repository } from './entity'
import { GetPublicRepositoriesInput, RepositoryStarringInput } from './type'
import { Auth } from '../common/authorizer/context'

export const RepositoryDataSource = new Token<RepositoryDataSource>()

export interface RepositoryDataSource {
  getPublicRepositories(input: GetPublicRepositoriesInput, auth: Auth): Promise<Repository[]>
  handleStarRepository(input: RepositoryStarringInput, auth: Auth): Promise<Boolean>
}
