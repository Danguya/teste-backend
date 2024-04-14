import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API } from "../services/axios";

type Task = {
  taskId: string
  title: string
  description: string
}

export function useEditTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({taskId, title, description}:Task) => {
      await API.put(`/tasks/${taskId}`,{title, description});
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey:["tasks"]
      });
    },
  });
}
