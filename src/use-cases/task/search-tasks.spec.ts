import { InMemoryTasksRepository } from '@/repositories/in-memory/tasks'
import { expect, describe, it, beforeEach } from 'vitest'
import { SearchTasksUseCase } from './search-task'

let tasksRepository: InMemoryTasksRepository
let sut: SearchTasksUseCase

describe('Search Tasks Use Case', () => {
  beforeEach(async () => {
    tasksRepository = new InMemoryTasksRepository()
    sut = new SearchTasksUseCase(tasksRepository)
  })

  it('should be able to search for tasks', async () => {
    await tasksRepository.create({
      title: 'Novas tarefas no Notion.',
      description: 'Devo agendar tarefas no notion.',
    })

    await tasksRepository.create({
      title: 'Praticar desenhos',
      description: 'Devo treinar mais desenhos artisticos as 21:30min',
    })

    const { tasks } = await sut.execute({
      query: 'NOVAS TAREFAS no notion.',
      page: 1,
    })

    expect(tasks).toHaveLength(1)
    expect(tasks).toEqual([
      expect.objectContaining({ title: 'Novas tarefas no Notion.' }),
    ])
  })

  it('should be able to fetch paginated tasks search', async () => {
    for (let i = 1; i <= 22; i++) {
      await tasksRepository.create({
        title: 'Tarefa ' + i,
        description: 'Descrição de exemplo',
      })
    }

    const { tasks } = await sut.execute({
      query: 'Tarefa',
      page: 2,
    })

    expect(tasks).toHaveLength(2)
    expect(tasks).toEqual([
      expect.objectContaining({ title: 'Tarefa 21' }),
      expect.objectContaining({ title: 'Tarefa 22' }),
    ])
  })
})
