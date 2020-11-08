import { Service } from 'typedi'
import { ApolloError } from 'apollo-server-lambda'
import axios from 'axios'
import { GetAccessTokenInput, GetAuthorizationURLOutput, GetAccessTokenOutput } from './type'
import { OauthDataSource } from './interface'

@Service('OauthController')
export class OauthController implements OauthDataSource {
  async getAuthorizationURL (): Promise<GetAuthorizationURLOutput> {
    return {
      url: `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&scope=user%20public_repo`
    }
  }

  async getAccessToken (input: GetAccessTokenInput): Promise<GetAccessTokenOutput> {
    const oauth = (await axios.post('https://github.com/login/oauth/access_token', {
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code: input.code
    }, {
      headers: { accept: 'application/json' }
    })).data

    if (typeof oauth.error !== 'undefined') {
      console.error(oauth)
      throw new ApolloError(
        'It\'s not possible to authenticate the user',
        'OWNER400'
      )
    }

    return {
      accessToken: oauth.access_token
    }
  }
}
