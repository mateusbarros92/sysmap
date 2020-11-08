import { Token } from 'typedi'
import { GetAccessTokenInput, GetAuthorizationURLOutput, GetAccessTokenOutput } from './type'

export const OauthDataSource = new Token<OauthDataSource>()

export interface OauthDataSource {
  getAuthorizationURL(): Promise<GetAuthorizationURLOutput>
  getAccessToken(input: GetAccessTokenInput): Promise<GetAccessTokenOutput>
}
