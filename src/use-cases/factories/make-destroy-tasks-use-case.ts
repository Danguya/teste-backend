import { AcebaseTasksRepository } from '@/repositories/acebase/acebase-tasks-repository'
import { DestroyTaskUseCase } from '../task/destroy-task '

export function makeDestroyTasksUseCase() {
  const tasksRepository = new AcebaseTasksRepository()
  const useCase = new DestroyTaskUseCase(tasksRepository)

  return useCase
}
