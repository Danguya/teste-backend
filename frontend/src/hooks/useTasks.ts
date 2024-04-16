import { useQuery } from '@tanstack/react-query'
import { API } from '../services/axios'

export function useTasks() {
  return useQuery({
    queryKey: ['tasks'],
    queryFn: async () => {
      const response = await API.get(`/tasks`)
      return response.data
    },
  })
}
