import { Task, TasksRepository } from '@/repositories/tasks'

interface FetchTasksUseCaseRequest {
  page: number
  pageSize: number
}

interface FetchTasksUseCaseResponse {
  tasks: Task[]
}

export class FetchTasksUseCase {
  constructor(private tasksRepository: TasksRepository) {}

  async execute({
    page,
    pageSize,
  }: FetchTasksUseCaseRequest): Promise<FetchTasksUseCaseResponse> {
    const tasks = await this.tasksRepository.findAll(page, pageSize)

    return {
      tasks,
    }
  }
}
