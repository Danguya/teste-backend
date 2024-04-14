import { Task, TasksRepository } from '@/repositories/tasks'

interface FetchTasksUseCaseRequest {
  page: number
  pageSize: number
  userId: string
}

interface FetchTasksUseCaseResponse {
  tasks: Task[]
}

export class FetchTasksUseCase {
  constructor(private tasksRepository: TasksRepository) {}

  async execute({
    page,
    pageSize,
    userId,
  }: FetchTasksUseCaseRequest): Promise<FetchTasksUseCaseResponse> {
    const tasks = await this.tasksRepository.findAll(page, pageSize, userId)

    return {
      tasks,
    }
  }
}
