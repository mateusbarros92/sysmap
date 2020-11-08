import { ObjectType, Field, ID } from 'type-graphql'
import { Owner } from '../owner/entity'

@ObjectType('Repository', { description: 'The Repository model' })
export class Repository {
  @Field(() => ID)
  id: string

  @Field(() => String)
  node_id: string

  @Field(() => String)
  name: string

  @Field(() => String)
  full_name: string

  @Field(() => Boolean)
  private: boolean

  @Field(() => Owner)
  owner: Owner

  @Field(() => String)
  html_url: string

  @Field(() => String)
  description: string

  @Field(() => Boolean)
  fork: boolean

  @Field(() => String)
  url: string

  @Field(() => String)
  forks_url: string

  @Field(() => String)
  keys_url: string

  @Field(() => String)
  collaborators_url: string

  @Field(() => String)
  teams_url: string

  @Field(() => String)
  hooks_url: string

  @Field(() => String)
  issue_events_url: string

  @Field(() => String)
  events_url: string

  @Field(() => String)
  assignees_url: string

  @Field(() => String)
  branches_url: string

  @Field(() => String)
  tags_url: string

  @Field(() => String)
  blobs_url: string

  @Field(() => String)
  git_tags_url: string

  @Field(() => String)
  git_refs_url: string

  @Field(() => String)
  trees_url: string

  @Field(() => String)
  statuses_url: string

  @Field(() => String)
  languages_url: string

  @Field(() => String)
  stargazers_url: string

  @Field(() => String)
  contributors_url: string

  @Field(() => String)
  subscribers_url: string

  @Field(() => String)
  subscription_url: string

  @Field(() => String)
  commits_url: string

  @Field(() => String)
  git_commits_url: string

  @Field(() => String)
  comments_url: string

  @Field(() => String)
  issue_comment_url: string

  @Field(() => String)
  contents_url: string

  @Field(() => String)
  compare_url: string

  @Field(() => String)
  merges_url: string

  @Field(() => String)
  archive_url: string

  @Field(() => String)
  downloads_url: string

  @Field(() => String)
  issues_url: string

  @Field(() => String)
  pulls_url: string

  @Field(() => String)
  milestones_url: string

  @Field(() => String)
  notifications_url: string

  @Field(() => String)
  labels_url: string

  @Field(() => String)
  deployments_url: string

  @Field(() => Date)
  created_at: Date

  @Field(() => Date)
  updated_at: Date

  @Field(() => Date)
  pushed_at: Date

  @Field(() => String)
  git_url: string

  @Field(() => String)
  ssh_url: string

  @Field(() => String)
  clone_url: string

  @Field(() => String)
  svn_url: string

  @Field(() => String, { nullable: true })
  homepage: string

  @Field(() => Number)
  size: number

  @Field(() => Number)
  stargazers_count: number

  @Field(() => Number)
  watchers_count: number

  @Field(() => String, { nullable: true })
  language: string

  @Field(() => Boolean)
  has_issues: boolean

  @Field(() => Boolean)
  has_projects: boolean

  @Field(() => Boolean)
  has_downloads: boolean

  @Field(() => Boolean)
  has_wiki: boolean

  @Field(() => Boolean)
  has_pages: boolean

  @Field(() => Number)
  forks_count: number

  @Field(() => String, { nullable: true })
  mirror_url: string

  @Field(() => Boolean)
  archived: boolean

  @Field(() => Boolean)
  disabled: boolean

  @Field(() => Number)
  open_issues_count: number

  @Field(() => String, { nullable: true })
  license: string

  @Field(() => Number)
  forks: number

  @Field(() => Number)
  open_issues: number

  @Field(() => Number)
  watchers: number

  @Field(() => String)
  default_branch: string

  @Field(() => Boolean)
  starred: boolean
}
