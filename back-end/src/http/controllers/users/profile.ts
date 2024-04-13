import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'
import { makeGetUserProfileUseCase } from '@/use-cases/factories/make-get-user-profile-use-case'
import { Request, Response } from 'express'

export async function profile(request: Request, response: Response) {
  try {
    const userId = request.userId

    const getUserProfile = makeGetUserProfileUseCase()
    const { user } = await getUserProfile.execute({
      userId,
    })

    return response.status(200).send({
      user: {
        ...user,
        password_hash: undefined,
      },
    })
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return response.status(400).json({ message: err.message })
    }
    return response.status(500).send(err)
  }
}
