import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found'
import { makeSearchTasksUseCase } from '@/use-cases/factories/make-search-tasks-use-case'
import { Response, Request } from 'express'
import { z } from 'zod'

export async function searchTasksRoute(request: Request, response: Response) {
  try {
    const searchTasksParamsSchema = z.object({
      query: z.string(),
      page: z.coerce.number().default(1),
    })

    const { query, page } = searchTasksParamsSchema.parse(request.query)

    const searchTasksUseCase = makeSearchTasksUseCase()
    const { tasks } = await searchTasksUseCase.execute({
      query,
      page,
    })

    return response.status(200).send(tasks)
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return response.status(404).json({ message: error.message })
    }
    return response.status(500).send({ message: 'Internal server error.' })
  }
}
