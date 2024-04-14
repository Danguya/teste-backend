import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API } from "../services/axios";

export function useDeleteTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (taskId: string) => {
      await API.delete(`/tasks/${taskId}`,);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey:["tasks"]
      });
    },
  });
}
