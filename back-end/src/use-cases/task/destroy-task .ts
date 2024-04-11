import { TasksRepository } from '@/repositories/tasks'
import { ResourceNotFoundError } from '../errors/resource-not-found'

interface DestroyTaskUseCaseRequest {
  taskId: string
}

export class DestroyTaskUseCase {
  constructor(private tasksRepository: TasksRepository) {}

  async execute({ taskId }: DestroyTaskUseCaseRequest) {
    const task = await this.tasksRepository.findById(taskId)

    if (!task) {
      throw new ResourceNotFoundError()
    }

    await this.tasksRepository.destroy(taskId)
  }
}
