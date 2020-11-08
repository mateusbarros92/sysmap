export interface Context {
  auth: Auth
}

export interface Auth {
  githubToken: string
}

export default function context (ctx: any): any {
  const Authorization = ctx.event.headers.Authorization
  const authorization = ctx.event.headers.authorization
  const auth = typeof Authorization !== 'undefined' ? Authorization : authorization

  if (typeof auth !== 'undefined' && auth.indexOf('Bearer') > -1) {
    try {
      const githubToken = auth.replace('Bearer ', '')
      return {
        auth: {
          githubToken
        }
      }
    } catch (err) { }
  } else {
    return null
  }
}
