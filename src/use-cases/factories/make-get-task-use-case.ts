import { AcebaseTasksRepository } from '@/repositories/acebase/acebase-tasks-repository'
import { GetTaskUseCase } from '../task/get-task'

export function makeGetTaskUseCase() {
  const tasksRepository = new AcebaseTasksRepository()
  const useCase = new GetTaskUseCase(tasksRepository)

  return useCase
}
