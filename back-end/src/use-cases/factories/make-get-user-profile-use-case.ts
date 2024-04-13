import { AcebaseUsersRepository } from '@/repositories/acebase/acebase-users-repository'

export function makeGetUserProfileUseCase() {
  const usersRepository = new AcebaseUsersRepository()
  const useCase = new GetUserProfileUseCase(usersRepository)

  return useCase
}
