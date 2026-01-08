import { z } from 'zod';

export const JobStatusSchema = z.enum(['In Progress', 'Pending Start', 'Delayed', 'Complete']);

export const JobSchema = z.object({
  id: z.string(),
  name: z.string(),
  address: z.string(),
  status: JobStatusSchema,
  progress: z.string(),
  crew: z.string(),
  dueDate: z.string(),
  budgetUsed: z.string(),
});

export type Job = z.infer<typeof JobSchema>;
