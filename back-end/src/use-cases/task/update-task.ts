import { Task, TasksRepository } from '@/repositories/tasks'
import { ResourceNotFoundError } from '../errors/resource-not-found'
import { EmptyTaskTitleError } from '../errors/empty-task-title-error'
import { EmptyTaskDescriptionError } from '../errors/empty-task-description-error'
import { TaskAlreadyExistsError } from '../errors/task-already-exists-error'

interface UpdateTaskUseCaseRequest {
  taskId: string
  title: string
  description: string
  isCompleted: boolean
}
interface ValidateUpdateTaskUseCaseResponse {
  task: Task
}

export class UpdateTaskUseCase {
  constructor(private tasksRepository: TasksRepository) {}

  async execute({
    taskId,
    title,
    isCompleted,
    description,
  }: UpdateTaskUseCaseRequest): Promise<ValidateUpdateTaskUseCaseResponse> {
    const task = await this.tasksRepository.findById(taskId)

    if (!task) {
      throw new ResourceNotFoundError()
    }

    if (title !== undefined && title !== null) {
      if (title.trim().length === 0) {
        throw new EmptyTaskTitleError()
      }
      const findTaskByTitle = await this.tasksRepository.findByTitle(title)
      if (findTaskByTitle) {
        throw new TaskAlreadyExistsError()
      }
      task.title = title
    }

    if (description !== undefined && description !== null) {
      if (description.trim().length === 0) {
        throw new EmptyTaskDescriptionError()
      }
      task.description = description
    }

    if (isCompleted !== undefined && isCompleted !== null) {
      task.isCompleted = isCompleted
    }

    await this.tasksRepository.save(task)

    return {
      task,
    }
  }
}
