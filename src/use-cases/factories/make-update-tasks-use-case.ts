import { AcebaseTasksRepository } from '@/repositories/acebase/acebase-tasks-repository'
import { UpdateTaskUseCase } from '../task/update-task'

export function makeUpdateTasksUseCase() {
  const tasksRepository = new AcebaseTasksRepository()
  const useCase = new UpdateTaskUseCase(tasksRepository)

  return useCase
}
