import { Service } from 'typedi'
import { ApolloError } from 'apollo-server-lambda'
import axios from 'axios'
import { Repository } from './entity'
import { GetPublicRepositoriesInput, RepositoryStarringInput } from './type'
import { RepositoryDataSource } from './interface'
import { Auth } from '../common/authorizer/context'

@Service('RepositoryController')
export class RepositoryController implements RepositoryDataSource {
  async getPublicRepositories (input: GetPublicRepositoriesInput, auth: Auth): Promise<Repository[]> {
    try {
      let configs: any = {}
      if (auth?.githubToken !== undefined) {
        configs = {
          headers: {
            Accept: 'application/vnd.github.v3+json',
            Authorization: `token ${auth.githubToken}`
          }
        }
      }

      const repos = await axios.get(`https://api.github.com/users/${input.owner}/repos`, configs)

      if (auth?.githubToken !== undefined) {
        return await Promise.all(repos.data.map(async (repo: Repository) => {
          let starred: boolean
          try {
            await axios.get(`https://api.github.com/user/starred/${repo.full_name}`, configs)
            starred = true
          } catch (e) {
            starred = false
          }
          return { ...repo, starred }
        }))
      } else {
        return repos.data.map((repo: Repository) => ({ ...repo, starred: false }))
      }
    } catch (error) {
      console.error(error)
      const status = error.response.status as string
      throw new ApolloError(
        error.response.data.message,
        `REPO${status}`
      )
    }
  }

  async handleStarRepository (input: RepositoryStarringInput, auth: Auth): Promise<boolean> {
    try {
      let starred: boolean
      const configs = {
        headers: {
          Accept: 'application/vnd.github.v3+json',
          Authorization: `token ${auth.githubToken}`
        }
      }

      try {
        await axios.get(`https://api.github.com/user/starred/${input.full_name}`, configs)
        await axios.delete(`https://api.github.com/user/starred/${input.full_name}`, configs)
        starred = false
      } catch (e) {
        await axios.put(`https://api.github.com/user/starred/${input.full_name}`, {}, configs)
        starred = true
      }

      return starred
    } catch (error) {
      console.error(error)
      const status = error.response.status as string
      throw new ApolloError(
        error.response.data.message,
        `REPO${status}`
      )
    }
  }
}
