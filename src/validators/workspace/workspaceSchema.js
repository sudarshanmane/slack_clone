import { z } from 'zod';

const workspaceZodSchema = z.object({
  name: z.string().min(3).max(50)
});

export default workspaceZodSchema;
