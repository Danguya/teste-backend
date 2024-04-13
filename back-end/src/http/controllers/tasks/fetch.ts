import { makeFetchTasksUseCase } from '@/use-cases/factories/make-fetch-tasks-use-case'
import { Response, Request } from 'express'
import { z } from 'zod'

export async function fetchTasksRoute(request: Request, response: Response) {
  const fetchTasksParamsSchema = z.object({
    page: z.coerce.number().default(1),
    pageSize: z.coerce.number().default(20),
  })

  const { page, pageSize } = fetchTasksParamsSchema.parse(request.query)

  const fetchTasksUseCase = makeFetchTasksUseCase()
  const { tasks } = await fetchTasksUseCase.execute({
    page,
    pageSize,
  })

  return response.status(200).send(tasks)
}
