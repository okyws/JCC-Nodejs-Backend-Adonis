import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class Owner {
  public async handle({response, auth}: HttpContextContract, next: () => Promise<void>) {
    // code for middleware goes here. ABOVE THE NEXT CALL
    let role = auth.user?.role
    if(role == 'owner') {
      await next()
    } else {
      return response.unauthorized({ message: 'Akses di tolak, anda bukan owner' })
    }
  }
}
