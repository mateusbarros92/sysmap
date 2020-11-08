import { Service as ServiceTypedi, Inject } from 'typedi'
import {
  Resolver,
  Query,
  Arg,
  Ctx,
  Mutation,
  Authorized
} from 'type-graphql'
import { Repository } from './entity'
import { GetPublicRepositoriesInput, RepositoryStarringInput } from './type'
import { RepositoryController } from './controller'
import { Auth } from '../common/authorizer/context'

@Resolver((_of) => Repository)
@ServiceTypedi()
export class RepositoryResolver {
  @Inject()
  repositoryController: RepositoryController

  @Query(() => [Repository])
  async getPublicRepositories (@Arg('input') input: GetPublicRepositoriesInput, @Ctx('auth') auth: Auth): Promise<Repository[]> {
    return await this.repositoryController.getPublicRepositories(input, auth)
  }

  @Authorized()
  @Mutation(() => Boolean)
  async handleStarRepository (@Arg('input') input: RepositoryStarringInput, @Ctx('auth') auth: Auth): Promise<boolean> {
    return await this.repositoryController.handleStarRepository(input, auth)
  }
}
