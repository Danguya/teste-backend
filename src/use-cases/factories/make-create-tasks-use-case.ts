import { AcebaseUsersRepository } from '@/repositories/acebase/acebase-users-repository'
import { TaskUseCase } from '../task'
import { AcebaseTasksRepository } from '@/repositories/acebase/acebase-tasks-repository'

export function makeCreateTaskUseCase() {
  const tasksRepository = new AcebaseTasksRepository()
  const usersRepository = new AcebaseUsersRepository()
  const useCase = new TaskUseCase(tasksRepository, usersRepository)

  return useCase
}
