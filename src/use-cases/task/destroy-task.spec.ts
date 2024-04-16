import { InMemoryTasksRepository } from '@/repositories/in-memory/tasks'
import { expect, describe, it, beforeEach } from 'vitest'
import { TaskUseCase } from './'
import { DestroyTaskUseCase } from './destroy-task '
import { ResourceNotFoundError } from '../errors/resource-not-found'
import { GetTaskUseCase } from './get-task'
import { InMemoryUsersRepository } from '@/repositories/in-memory/users'

let tasksRepository: InMemoryTasksRepository
let usersRepository: InMemoryUsersRepository
let sut: DestroyTaskUseCase
let creteTaskUseCase: TaskUseCase
let getTaskUseCase: GetTaskUseCase

describe('Destroy Task Use Case', () => {
  beforeEach(() => {
    tasksRepository = new InMemoryTasksRepository()
    usersRepository = new InMemoryUsersRepository()
    creteTaskUseCase = new TaskUseCase(tasksRepository, usersRepository)
    getTaskUseCase = new GetTaskUseCase(tasksRepository)
    sut = new DestroyTaskUseCase(tasksRepository)
  })
  it('should be able to delete a Task', async () => {
    await usersRepository.create({
      email: 'john.doe@gmail.com',
      password_hash: '123456',
      name: 'John Doe',
      id: '20',
    })
    await creteTaskUseCase.execute({
      id: '1',
      title: 'Estudar JS',
      description: 'Academia JS',
      userId: '20',
    })

    await sut.execute({ taskId: '1', userId: '20' })

    await expect(() =>
      getTaskUseCase.execute({ taskId: '3' }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
