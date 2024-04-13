import { UsersRepository } from '@/repositories/users'
import { EmptyTaskDescriptionError } from '../errors/empty-task-description-error'
import { EmptyTaskTitleError } from '../errors/empty-task-title-error'
import { TaskAlreadyExistsError } from '../errors/task-already-exists-error'
import { Task, TasksRepository } from '@/repositories/tasks'
import { UserNotFoundError } from '../errors/user-not-found-error'

interface TaskUseCaseRequest {
  id?: string
  title: string
  description: string
  userId: string
}

interface TaskUseCaseResponse {
  task: Task
}

export class TaskUseCase {
  // eslint-disable-next-line prettier/prettier
  constructor(private tasksRepository: TasksRepository, private usersRepository: UsersRepository) { }

  async execute({
    id,
    title,
    description,
    userId,
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

    const findUser = await this.usersRepository.findById(userId)

    if (!findUser) {
      throw new UserNotFoundError()
    }

    const task = await this.tasksRepository.create({
      id,
      title,
      description,
      userId,
    })

    return {
      task,
    }
  }
}
