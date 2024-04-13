import { TaskAlreadyExistsError } from '@/use-cases/errors/task-already-exists-error'
import { makeCreateTaskUseCase } from '@/use-cases/factories/make-create-tasks-use-case'
import { Request, Response } from 'express'
import { ZodError, z } from 'zod'

export async function createTaskRoute(request: Request, response: Response) {
  try {
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

    return response.status(201).send(task)
  } catch (error) {
    if (error instanceof ZodError) {
      return response
        .status(500)
        .json({ message: 'Validation error.', issues: error.format() })
    }

    if (error instanceof TaskAlreadyExistsError) {
      return response.status(500).json({ message: error.message })
    }
    return response.status(500).send({ message: 'Internal server error.' })
  }
}
