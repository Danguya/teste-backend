import { AcebaseTasksRepository } from '@/repositories/acebase/acebase-tasks-repository'
import { SearchTasksUseCase } from '../task/search-task'

export function makeSearchTasksUseCase() {
  const tasksRepository = new AcebaseTasksRepository()
  const useCase = new SearchTasksUseCase(tasksRepository)

  return useCase
}
