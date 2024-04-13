import { makeGetTaskUseCase } from '@/use-cases/factories/make-get-task-use-case'
import { Response, Request } from 'express'
import { z } from 'zod'

export async function getTasksRoute(request: Request, response: Response) {
  const fetchTasksParamsSchema = z.object({
    taskId: z.string(),
  })

  const { taskId } = fetchTasksParamsSchema.parse(request.params)

  const getTaskUseCase = makeGetTaskUseCase()
  const { task } = await getTaskUseCase.execute({ taskId })

  return response.status(200).send(task)
}
