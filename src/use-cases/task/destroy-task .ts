import { TasksRepository } from '@/repositories/tasks'
import { ResourceNotFoundError } from '../errors/resource-not-found'
import { OperationNotPermitedError } from '../errors/operation-not-permited-error'

interface DestroyTaskUseCaseRequest {
  taskId: string
  userId: string
}

export class DestroyTaskUseCase {
  constructor(private tasksRepository: TasksRepository) {}

  async execute({ taskId, userId }: DestroyTaskUseCaseRequest) {
    const task = await this.tasksRepository.findById(taskId)

    if (!task) {
      throw new ResourceNotFoundError()
    }

    if (task.userId !== userId) {
      console.log(task.userId, userId)
      throw new OperationNotPermitedError()
    }

    await this.tasksRepository.destroy(taskId)
  }
}
