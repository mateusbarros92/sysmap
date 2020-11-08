import { AuthChecker } from 'type-graphql'
import { Context } from './context'

export const authChecker: AuthChecker<Context> = (
  { context }
) => {
  if (typeof context.auth === 'undefined') return false
  return true
}
