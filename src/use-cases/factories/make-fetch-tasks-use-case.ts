import { AcebaseTasksRepository } from '@/repositories/acebase/acebase-tasks-repository'
import { FetchTasksUseCase } from '../task/fetch-tasks'

export function makeFetchTasksUseCase() {
  const tasksRepository = new AcebaseTasksRepository()
  const useCase = new FetchTasksUseCase(tasksRepository)

  return useCase
}
