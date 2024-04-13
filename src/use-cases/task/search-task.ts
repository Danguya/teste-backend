import { Task, TasksRepository } from '@/repositories/tasks'

interface SearchTasksUseCaseRequest {
  query: string
  page: number
}

interface SearchTasksUseCaseResponse {
  tasks: Task[]
}

export class SearchTasksUseCase {
  constructor(private tasksRepository: TasksRepository) {}

  async execute({
    query,
    page,
  }: SearchTasksUseCaseRequest): Promise<SearchTasksUseCaseResponse> {
    const tasks = await this.tasksRepository.searchMany(query, page)

    return {
      tasks,
    }
  }
}
