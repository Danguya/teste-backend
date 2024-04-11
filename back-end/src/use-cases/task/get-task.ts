import { Task, TasksRepository } from '@/repositories/tasks'
import { ResourceNotFoundError } from '../errors/resource-not-found'

interface GetTaskUseCaseRequest {
  taskId: string
}
interface GetTaskUseCaseResponse {
  task: Task
}

export class GetTaskUseCase {
  constructor(private taskRepository: TasksRepository) {}

  async execute({
    taskId,
  }: GetTaskUseCaseRequest): Promise<GetTaskUseCaseResponse> {
    const task = await this.taskRepository.findById(taskId)

    if (!task) {
      throw new ResourceNotFoundError()
    }

    return {
      task,
    }
  }
}
