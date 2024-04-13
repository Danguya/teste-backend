import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found'
import { makeUpdateTasksUseCase } from '@/use-cases/factories/make-update-tasks-use-case'
import { Response, Request } from 'express'
import { z } from 'zod'

export async function updateTasksRoute(request: Request, response: Response) {
  try {
    const updateTasksBodySchema = z.object({
      title: z.string().optional(),
      description: z.string().optional(),
      isCompleted: z.boolean().optional(),
    })

    const { description, isCompleted, title } = updateTasksBodySchema.parse(
      request.body,
    )
    const taskId: string = request.params.taskId

    const updateTasksUseCase = makeUpdateTasksUseCase()
    const { task } = await updateTasksUseCase.execute({
      taskId,
      description,
      isCompleted,
      title,
    })
    return response.status(200).send(task)
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return response.status(500).json({ message: error.message })
    }
    return response.status(500).send({ message: 'Internal server error.' })
  }
}
