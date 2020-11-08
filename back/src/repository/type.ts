import { InputType, Field } from 'type-graphql'
import { MinLength } from 'class-validator'

@InputType('GetPublicRepositoriesInput')
export class GetPublicRepositoriesInput {
  @Field()
  @MinLength(1, { message: 'O nome do usuário deve conter no mínimo 1 caractere' })
  owner: string
}

@InputType('RepositoryStarringInput')
export class RepositoryStarringInput {
  @Field()
  @MinLength(1, { message: 'O nome completo do repositório deve conter no mínimo 1 caractere' })
  full_name: string
}
