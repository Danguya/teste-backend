import { InMemoryTasksRepository } from '@/repositories/in-memory/tasks'
import { expect, describe, it, beforeEach } from 'vitest'
import { TaskUseCase } from './'
import { DestroyTaskUseCase } from './destroy-task '
import { ResourceNotFoundError } from '../errors/resource-not-found'
import { GetTaskUseCase } from './get-task'

let tasksRepository: InMemoryTasksRepository
let sut: DestroyTaskUseCase
let creteTaskUseCase: TaskUseCase
let getTaskUseCase: GetTaskUseCase

describe('Destroy Task Use Case', () => {
  beforeEach(() => {
    tasksRepository = new InMemoryTasksRepository()
    creteTaskUseCase = new TaskUseCase(tasksRepository)
    getTaskUseCase = new GetTaskUseCase(tasksRepository)
    sut = new DestroyTaskUseCase(tasksRepository)
  })
  it('should be able to delete a Task', async () => {
    await creteTaskUseCase.execute({
      id: '1',
      title: 'Estudar JS',
      description: 'Academia JS',
    })

    await sut.execute({ taskId: '1' })

    await expect(() =>
      getTaskUseCase.execute({ taskId: '3' }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
