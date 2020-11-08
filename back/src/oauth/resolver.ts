import { Service as ServiceTypedi, Inject } from 'typedi'
import {
  Resolver,
  Query,
  Arg,
  Mutation
} from 'type-graphql'
import { Oauth } from './entity'
import { GetAccessTokenInput, GetAuthorizationURLOutput, GetAccessTokenOutput } from './type'
import { OauthController } from './controller'

@Resolver((_of) => Oauth)
@ServiceTypedi()
export class OauthResolver {
  @Inject()
  oauthController: OauthController

  @Query(() => GetAuthorizationURLOutput)
  async getAuthorizationURL (): Promise<GetAuthorizationURLOutput> {
    return await this.oauthController.getAuthorizationURL()
  }

  @Mutation(() => GetAccessTokenOutput)
  async getAccessToken (@Arg('input') input: GetAccessTokenInput): Promise<GetAccessTokenOutput> {
    return await this.oauthController.getAccessToken(input)
  }
}
