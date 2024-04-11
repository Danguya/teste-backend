import { InMemoryTasksRepository } from '@/repositories/in-memory/tasks'
import { expect, describe, it, beforeEach } from 'vitest'
import { TaskUseCase } from '.'
import { TaskAlreadyExistsError } from '../errors/task-already-exists-error'
import { EmptyTaskTitleError } from '../errors/empty-task-title-error'
import { EmptyTaskDescriptionError } from '../errors/empty-task-description-error'
import { UpdateTaskUseCase } from './update-task'

let tasksRepository: InMemoryTasksRepository
let updateTaskUse: UpdateTaskUseCase
let sut: TaskUseCase

describe('Update Task Use Case', () => {
  beforeEach(() => {
    tasksRepository = new InMemoryTasksRepository()
    sut = new TaskUseCase(tasksRepository)
    updateTaskUse = new UpdateTaskUseCase(tasksRepository)
  })
  it('should be able to update a Task', async () => {
    await sut.execute({
      id: '1',
      title: 'Estudar JS',
      description: 'Academia JS',
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
    await sut.execute({
      id: '1',
      title: 'Estudar JS',
      description: 'Academia JS',
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
    await sut.execute({
      id: '1',
      title: 'Estudar JS',
      description: 'Academia JS',
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
    const title = 'Estudar JS'
    await sut.execute({
      id: '1',
      title,
      description: 'Academia JS',
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
