import { useQuery } from "@tanstack/react-query";
import { API } from "../services/axios";

type Task = {
  id?: string;
  title?: string;
  description?: string;
  isCompleted?: boolean;
};

export function useTasks() {
  return useQuery<Task[]>({queryKey:["tasks"],  queryFn: async () => {
    const response = await API.get(`/tasks`)
    return response.data
  }});
}
