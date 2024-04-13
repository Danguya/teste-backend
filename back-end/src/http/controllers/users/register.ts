import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'
import { makeRegisterUseCase } from '@/use-cases/factories/make-register-use-case'
import { Request, Response } from 'express'
import { ZodError, z } from 'zod'

export async function register(request: Request, response: Response) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { name, email, password } = registerBodySchema.parse(request.body)

  try {
    const registerUseCase = makeRegisterUseCase()
    await registerUseCase.execute({
      name,
      email,
      password,
    })
  } catch (err) {
    if (err instanceof ZodError) {
      return response
        .status(500)
        .json({ message: 'Validation error.', issues: err.format() })
    }
    if (err instanceof UserAlreadyExistsError) {
      return response.status(409).send({ message: err.message })
    }
    if (err instanceof InvalidCredentialsError) {
      return response.status(409).send({ message: err.message })
    }
    return response.status(500).send()
  }

  return response.status(201).send()
}
