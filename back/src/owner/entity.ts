import { ObjectType, Field, ID } from 'type-graphql'

@ObjectType('Owner', { description: 'The Owner model' })
export class Owner {
  @Field(() => ID)
  id: string

  @Field(() => String)
  login: string

  @Field(() => String)
  node_id: string

  @Field(() => String)
  avatar_url: string

  @Field(() => String)
  gravatar_id: string

  @Field(() => String)
  url: string

  @Field(() => String)
  html_url: string

  @Field(() => String)
  followers_url: string

  @Field(() => String)
  following_url: string

  @Field(() => String)
  gists_url: string

  @Field(() => String)
  starred_url: string

  @Field(() => String)
  subscriptions_url: string

  @Field(() => String)
  organizations_url: string

  @Field(() => String)
  repos_url: string

  @Field(() => String)
  events_url: string

  @Field(() => String)
  received_events_url: string

  @Field(() => String)
  type: string

  @Field(() => Boolean)
  site_admin: string
}
