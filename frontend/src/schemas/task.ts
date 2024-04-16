import { z } from 'zod'

export const TaskSchema = z.object({
  title: z.string().nonempty(),
  description: z.string().nonempty(),
})
