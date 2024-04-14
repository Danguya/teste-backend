import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API } from "../services/axios";

type Task = {
  title: string
  description: string
}

export function useAddTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({title, description}:Task) => {
      await API.post(`/tasks/`,{title, description});
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey:["tasks"]
      });
    },
  });
}
