import { InMemoryTasksRepository } from '@/repositories/in-memory/tasks'
import { expect, describe, it, beforeEach } from 'vitest'
import { TaskUseCase } from '.'
import { TaskAlreadyExistsError } from '../errors/task-already-exists-error'
import { EmptyTaskTitleError } from '../errors/empty-task-title-error'
import { EmptyTaskDescriptionError } from '../errors/empty-task-description-error'
import { UpdateTaskUseCase } from './update-task'
import { InMemoryUsersRepository } from '@/repositories/in-memory/users'

let tasksRepository: InMemoryTasksRepository
let usersRepository: InMemoryUsersRepository
let updateTaskUse: UpdateTaskUseCase
let sut: TaskUseCase

describe('Update Task Use Case', () => {
  beforeEach(() => {
    tasksRepository = new InMemoryTasksRepository()
    usersRepository = new InMemoryUsersRepository()
    sut = new TaskUseCase(tasksRepository, usersRepository)
    updateTaskUse = new UpdateTaskUseCase(tasksRepository)
  })
  it('should be able to update a Task', async () => {
    await usersRepository.create({
      email: 'john.doe@gmail.com',
      password_hash: '123456',
      name: 'John Doe',
      id: '1',
    })

    await sut.execute({
      id: '1',
      title: 'Estudar JS',
      description: 'Academia JS',
      userId: '1',
    })

    const { task } = await updateTaskUse.execute({
      taskId: '1',
      title: 'JS',
      description: 'Academia',
      isCompleted: true,
    })
    expect(task.id).toBe('1')
    expect(task.title).toBe('JS')
    expect(task.description).toBe('Academia')
    expect(task.isCompleted).toBe(true)
  })

  it('should not be able to update a task with empty title', async () => {
    await usersRepository.create({
      email: 'john.doe@gmail.com',
      password_hash: '123456',
      name: 'John Doe',
      id: '1',
    })

    await sut.execute({
      id: '1',
      title: 'Estudar JS',
      description: 'Academia JS',
      userId: '1',
    })
    await expect(() =>
      updateTaskUse.execute({
        taskId: '1',
        title: '',
        description: 'Academia',
        isCompleted: true,
      }),
    ).rejects.toBeInstanceOf(EmptyTaskTitleError)
  })

  it('should not be able to update a task with empty description', async () => {
    await usersRepository.create({
      email: 'john.doe@gmail.com',
      password_hash: '123456',
      name: 'John Doe',
      id: '1',
    })

    await sut.execute({
      id: '1',
      title: 'Estudar JS',
      description: 'Academia JS',
      userId: '1',
    })
    await expect(() =>
      updateTaskUse.execute({
        taskId: '1',
        title: 'tarefa',
        description: '',
        isCompleted: true,
      }),
    ).rejects.toBeInstanceOf(EmptyTaskDescriptionError)
  })

  it('should not be able to create a task with same title twice', async () => {
    await usersRepository.create({
      email: 'john.doe@gmail.com',
      password_hash: '123456',
      name: 'John Doe',
      id: '1',
    })
    const title = 'Estudar JS'
    await sut.execute({
      id: '1',
      title,
      description: 'Academia JS',
      userId: '1',
    })
    await expect(() =>
      updateTaskUse.execute({
        taskId: '1',
        title,
        description: 'Academia',
        isCompleted: true,
      }),
    ).rejects.toBeInstanceOf(TaskAlreadyExistsError)
  })
})
