import { makeCreateTaskUseCase } from '@/use-cases/factories/make-create-tasks-use-case'
import { Request, Response } from 'express'
import { z } from 'zod'

export async function createTaskRoute(request: Request, response: Response) {
  const createTaskBodySchema = z.object({
    title: z.string(),
    description: z.string(),
  })

  const { title, description } = createTaskBodySchema.parse(request.body)

  const createTaskUseCase = makeCreateTaskUseCase()
  const { task } = await createTaskUseCase.execute({
    title,
    description,
  })

  return response.status(201).send({ task })
}
