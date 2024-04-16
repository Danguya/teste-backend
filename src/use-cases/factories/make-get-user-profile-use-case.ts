import { AcebaseUsersRepository } from '@/repositories/acebase/acebase-users-repository'
import { GetUserProfileUseCase } from '../user/get-user-profile'

export function makeGetUserProfileUseCase() {
  const usersRepository = new AcebaseUsersRepository()
  const useCase = new GetUserProfileUseCase(usersRepository)

  return useCase
}
