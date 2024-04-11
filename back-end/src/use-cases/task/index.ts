import { EmptyTaskDescriptionError } from '../errors/empty-task-description-error'
import { EmptyTaskTitleError } from '../errors/empty-task-title-error'
import { TaskAlreadyExistsError } from '../errors/task-already-exists-error'
import { Task, TasksRepository } from '@/repositories/tasks'

interface TaskUseCaseRequest {
  id?: string
  title: string
  description: string
}

interface TaskUseCaseResponse {
  task: Task
}

export class TaskUseCase {
  // eslint-disable-next-line prettier/prettier
  constructor(private tasksRepository: TasksRepository) { }

  async execute({
    id,
    title,
    description,
  }: TaskUseCaseRequest): Promise<TaskUseCaseResponse> {
    if (title === '') {
      throw new EmptyTaskTitleError()
    }

    if (description === '') {
      throw new EmptyTaskDescriptionError()
    }

    const taskWithSameTitle = await this.tasksRepository.findByTitle(title)

    if (taskWithSameTitle) {
      throw new TaskAlreadyExistsError()
    }

    const task = await this.tasksRepository.create({
      id,
      title,
      description,
    })

    return {
      task,
    }
  }
}
