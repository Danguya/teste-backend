import { useQuery } from '@tanstack/react-query'
import { API } from '../services/axios'

export function useUserInformation() {
  return useQuery({
    queryKey: ['account'],
    queryFn: async () => {
      const response = await API.get(`/users/me`)
      return response.data
    },
  })
}
