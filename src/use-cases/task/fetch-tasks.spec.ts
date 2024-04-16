import { InMemoryTasksRepository } from '@/repositories/in-memory/tasks'
import { expect, describe, it, beforeEach } from 'vitest'
import { FetchTasksUseCase } from './fetch-tasks'

let tasksRepository: InMemoryTasksRepository
let sut: FetchTasksUseCase

describe('Fetch Task Use Case', () => {
  beforeEach(async () => {
    tasksRepository = new InMemoryTasksRepository()
    sut = new FetchTasksUseCase(tasksRepository)
  })

  it('should be able to fetch paginated tasks', async () => {
    for (let i = 1; i <= 30; i++) {
      await tasksRepository.create({
        title: 'Tarefa ' + i,
        description: 'Descrição de exemplo',
      })
    }

    const { tasks } = await sut.execute({
      page: 1,
      pageSize: 20,
    })

    expect(tasks).toHaveLength(20)
  })
})
