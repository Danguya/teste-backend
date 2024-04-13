import { InMemoryTasksRepository } from '@/repositories/in-memory/tasks'
import { expect, describe, it, beforeEach } from 'vitest'
import { TaskUseCase } from '.'
import { TaskAlreadyExistsError } from '../errors/task-already-exists-error'
import { EmptyTaskTitleError } from '../errors/empty-task-title-error'
import { EmptyTaskDescriptionError } from '../errors/empty-task-description-error'
import { InMemoryUsersRepository } from '@/repositories/in-memory/users'

let usersRepository: InMemoryUsersRepository
let tasksRepository: InMemoryTasksRepository
let sut: TaskUseCase

describe('Create Task Use Case', () => {
  beforeEach(() => {
    tasksRepository = new InMemoryTasksRepository()
    usersRepository = new InMemoryUsersRepository()
    sut = new TaskUseCase(tasksRepository, usersRepository)
  })
  it('should be able to create a Task', async () => {
    await usersRepository.create({
      email: 'john.doe@gmail.com',
      password_hash: '123456',
      name: 'John Doe',
      id: '1',
    })

    const { task } = await sut.execute({
      title: 'Estudar JS',
      description: 'Academia JS',
      userId: '1',
    })

    expect(task.id).toEqual(expect.any(String))
    expect(task.title).toBe('Estudar JS')
    expect(task.description).toBe('Academia JS')
  })

  it('should not be able to create a task with empty title', async () => {
    await usersRepository.create({
      email: 'john.doe@gmail.com',
      password_hash: '',
      name: 'John Doe',
      id: '1',
    })

    await expect(() =>
      sut.execute({
        title: '',
        description: 'exemplo de descricao.',
        userId: '1',
      }),
    ).rejects.toBeInstanceOf(EmptyTaskTitleError)
  })

  it('should not be able to create a task with empty description', async () => {
    await usersRepository.create({
      email: 'john.doe@gmail.com',
      password_hash: '',
      name: 'John Doe',
      id: '1',
    })
    await expect(() =>
      sut.execute({
        title: 'Exemplo de Titulo',
        description: '',
        userId: '1',
      }),
    ).rejects.toBeInstanceOf(EmptyTaskDescriptionError)
  })

  it('should not be able to create a task with same title twice', async () => {
    const title = 'Aprender Typescript'

    await usersRepository.create({
      email: 'john.doe@gmail.com',
      password_hash: '',
      name: 'John Doe',
      id: '1',
    })

    await sut.execute({
      title,
      description: 'exemplo de descricao.',
      userId: '1',
    })
    await expect(() =>
      sut.execute({
        title,
        description: 'exemplo de descricao.',
        userId: '1',
      }),
    ).rejects.toBeInstanceOf(TaskAlreadyExistsError)
  })
})
