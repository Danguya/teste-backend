import { makeUpdateTasksUseCase } from '@/use-cases/factories/make-update-tasks-use-case'
import { Response, Request } from 'express'
import { z } from 'zod'

export async function updateTasksRoute(request: Request, response: Response) {
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
}
