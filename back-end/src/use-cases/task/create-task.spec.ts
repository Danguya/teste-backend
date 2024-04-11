import { InMemoryTasksRepository } from '@/repositories/in-memory/tasks'
import { expect, describe, it, beforeEach } from 'vitest'
import { TaskUseCase } from '.'
import { TaskAlreadyExistsError } from '../errors/task-already-exists-error'
import { EmptyTaskTitleError } from '../errors/empty-task-title-error'
import { EmptyTaskDescriptionError } from '../errors/empty-task-description-error'

let tasksRepository: InMemoryTasksRepository
let sut: TaskUseCase

describe('Create Task Use Case', () => {
  beforeEach(() => {
    tasksRepository = new InMemoryTasksRepository()
    sut = new TaskUseCase(tasksRepository)
  })
  it('should be able to create a Task', async () => {
    const { task } = await sut.execute({
      title: 'Estudar JS',
      description: 'Academia JS',
    })

    expect(task.id).toEqual(expect.any(String))
    expect(task.title).toBe('Estudar JS')
    expect(task.description).toBe('Academia JS')
  })

  it('should not be able to create a task with empty title', async () => {
    await expect(() =>
      sut.execute({
        title: '',
        description: 'exemplo de descricao.',
      }),
    ).rejects.toBeInstanceOf(EmptyTaskTitleError)
  })

  it('should not be able to create a task with empty description', async () => {
    await expect(() =>
      sut.execute({
        title: 'Exemplo de Titulo',
        description: '',
      }),
    ).rejects.toBeInstanceOf(EmptyTaskDescriptionError)
  })

  it('should not be able to create a task with same title twice', async () => {
    const title = 'Aprender Typescript'

    await sut.execute({
      title,
      description: 'exemplo de descricao.',
    })
    await expect(() =>
      sut.execute({
        title,
        description: 'exemplo de descricao.',
      }),
    ).rejects.toBeInstanceOf(TaskAlreadyExistsError)
  })
})
