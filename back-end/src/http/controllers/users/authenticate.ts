import { Request, Response } from 'express'
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'
import { ZodError, z } from 'zod'
import { makeAuthenticateUseCase } from '@/use-cases/factories/make-authenticate-use-case'
import { generateAccessToken, generateRefreshToken } from '@/utils/token'

export async function authenticate(request: Request, response: Response) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  try {
    const { email, password } = authenticateBodySchema.parse(request.body)

    const authenticateUseCase = makeAuthenticateUseCase()

    const { user } = await authenticateUseCase.execute({
      email,
      password,
    })

    const token = generateAccessToken(user.id as string)
    const refreshToken = generateRefreshToken(user.id as string)

    response
      .cookie('refreshToken', refreshToken, {
        path: '/',
        secure: true,
        sameSite: 'strict',
        httpOnly: true,
      })
      .status(200)
      .send({ token })
  } catch (err) {
    if (err instanceof ZodError) {
      return response
        .status(500)
        .json({ message: 'Validation error.', issues: err.format() })
    }
    if (err instanceof InvalidCredentialsError) {
      return response.status(400).json({ message: err.message })
    }
    return response.status(500).send(err)
  }
}
