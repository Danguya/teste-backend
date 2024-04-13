import { TaskUseCase } from '../task'
import { AcebaseTasksRepository } from '@/repositories/acebase/acebase-tasks-repository'

export function makeCreateTaskUseCase() {
  const tasksRepository = new AcebaseTasksRepository()
  const useCase = new TaskUseCase(tasksRepository)

  return useCase
}
