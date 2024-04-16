import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found'
import { makeGetTaskUseCase } from '@/use-cases/factories/make-get-task-use-case'
import { Response, Request } from 'express'
import { z } from 'zod'

export async function getTasksRoute(request: Request, response: Response) {
  try {
    const fetchTasksParamsSchema = z.object({
      taskId: z.string(),
    })

    const { taskId } = fetchTasksParamsSchema.parse(request.params)

    const getTaskUseCase = makeGetTaskUseCase()
    const { task } = await getTaskUseCase.execute({ taskId })

    return response.status(200).send(task)
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return response.status(404).json({ message: error.message })
    }
    return response.status(500).send({ message: 'Internal server error.' })
  }
}
