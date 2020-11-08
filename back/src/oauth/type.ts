import { InputType, ObjectType, Field } from 'type-graphql'
import { MinLength } from 'class-validator'

@InputType('GetAccessTokenInput')
export class GetAccessTokenInput {
  @Field()
  @MinLength(1, { message: 'O código deve conter no mínimo 1 caractere' })
  code: string
}

@ObjectType('GetAuthorizationURLOutput')
export class GetAuthorizationURLOutput {
  @Field()
  url: string
}

@ObjectType('GetAccessTokenOutput')
export class GetAccessTokenOutput {
  @Field()
  accessToken: string
}
