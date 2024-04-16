import { TaskAlreadyExistsError } from '@/use-cases/errors/task-already-exists-error'
import { UserNotFoundError } from '@/use-cases/errors/user-not-found-error'
import { makeCreateTaskUseCase } from '@/use-cases/factories/make-create-tasks-use-case'
import { Request, Response } from 'express'
import { ZodError, z } from 'zod'

export async function createTaskRoute(request: Request, response: Response) {
  try {
    const createTaskBodySchema = z.object({
      title: z.string(),
      description: z.string(),
      isCompleted: z.coerce.boolean().optional(),
    })

    const { title, description, isCompleted } = createTaskBodySchema.parse(
      request.body,
    )

    const createTaskUseCase = makeCreateTaskUseCase()
    const { task } = await createTaskUseCase.execute({
      title,
      description,
      isCompleted,
      userId: request.userId,
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
    if (error instanceof UserNotFoundError) {
      return response.status(500).json({ message: error.message })
    }
    return response.status(500).send({ message: 'Internal server error.' })
  }
}
