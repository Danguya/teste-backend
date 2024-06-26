import { Task, TasksRepository } from '@/repositories/tasks'
import { ResourceNotFoundError } from '../errors/resource-not-found'
import { EmptyTaskTitleError } from '../errors/empty-task-title-error'
import { EmptyTaskDescriptionError } from '../errors/empty-task-description-error'
import { TaskAlreadyExistsError } from '../errors/task-already-exists-error'
import { OperationNotPermitedError } from '../errors/operation-not-permited-error'

interface UpdateTaskUseCaseRequest {
  taskId: string
  title?: string
  userId?: string
  description?: string
  isCompleted?: boolean
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
    userId,
  }: UpdateTaskUseCaseRequest): Promise<ValidateUpdateTaskUseCaseResponse> {
    const task = await this.tasksRepository.findById(taskId)
    if (!task) {
      throw new ResourceNotFoundError()
    }

    if (task.userId !== userId) {
      throw new OperationNotPermitedError()
    }

    if (title !== undefined && title !== null) {
      if (title.trim().length === 0) {
        throw new EmptyTaskTitleError()
      }
      const findTaskByTitle = await this.tasksRepository.findByTitle(title)
      if (findTaskByTitle?.id !== taskId && findTaskByTitle?.id !== undefined) {
        throw new TaskAlreadyExistsError()
      }
      task.title = title
      task.updated_at = new Date()
    }

    if (description !== undefined && description !== null) {
      if (description.trim().length === 0) {
        throw new EmptyTaskDescriptionError()
      }
      task.description = description
      task.updated_at = new Date()
    }

    if (isCompleted !== undefined && isCompleted !== null) {
      console.log('COMP', isCompleted)
      task.isCompleted = isCompleted
      task.updated_at = new Date()
    }
    await this.tasksRepository.save(task)

    return {
      task,
    }
  }
}
