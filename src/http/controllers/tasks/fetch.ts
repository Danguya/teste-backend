import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found'
import { makeFetchTasksUseCase } from '@/use-cases/factories/make-fetch-tasks-use-case'
import { Response, Request } from 'express'
import { z } from 'zod'

export async function fetchTasksRoute(request: Request, response: Response) {
  try {
    const fetchTasksParamsSchema = z.object({
      page: z.coerce.number().default(1),
      pageSize: z.coerce.number().default(20),
    })

    const { page, pageSize } = fetchTasksParamsSchema.parse(request.query)

    const fetchTasksUseCase = makeFetchTasksUseCase()
    const { tasks } = await fetchTasksUseCase.execute({
      page,
      pageSize,
      userId: request.userId,
    })

    return response.status(200).send(tasks)
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return response.status(404).json({ message: error.message })
    }
    return response.status(500).send({ message: 'Internal server error.' })
  }
}
