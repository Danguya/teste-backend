import { useMutation, useQueryClient } from '@tanstack/react-query'
import { API } from '../services/axios'

type Task = {
  title: string
  description: string
  isCompleted: boolean
}

export function useAddTask() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ title, description, isCompleted }: Task) => {
      await API.post(`/tasks/`, { title, description, isCompleted })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['tasks'],
      })
    },
  })
}
