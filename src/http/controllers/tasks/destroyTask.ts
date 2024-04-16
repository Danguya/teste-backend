import { OperationNotPermitedError } from '@/use-cases/errors/operation-not-permited-error'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found'
import { makeDestroyTasksUseCase } from '@/use-cases/factories/make-destroy-tasks-use-case'
import { Response, Request } from 'express'
import { z } from 'zod'

export async function destroyTasksRoute(request: Request, response: Response) {
  try {
    const fetchTasksParamsSchema = z.object({
      taskId: z.string(),
    })

    const { taskId } = fetchTasksParamsSchema.parse(request.params)

    const destroyTaskUseCase = makeDestroyTasksUseCase()
    await destroyTaskUseCase.execute({ taskId, userId: request.userId })

    return response.status(202).json()
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return response.status(500).json({ message: error.message })
    }
    if (error instanceof OperationNotPermitedError) {
      return response
        .status(401)
        .json({ message: 'Usuário não tem permissão para isto.' })
    }
    return response.status(500).send({ message: 'Internal server error.' })
  }
}
