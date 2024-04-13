import { makeDestroyTasksUseCase } from '@/use-cases/factories/make-destroy-tasks-use-case'
import { Response, Request } from 'express'
import { z } from 'zod'

export async function destroyTasksRoute(request: Request, response: Response) {
  const fetchTasksParamsSchema = z.object({
    taskId: z.string(),
  })

  const { taskId } = fetchTasksParamsSchema.parse(request.params)

  const destroyTaskUseCase = makeDestroyTasksUseCase()
  await destroyTaskUseCase.execute({ taskId })

  return response.status(202).json()
}
