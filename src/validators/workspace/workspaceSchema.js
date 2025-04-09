import { z } from 'zod';

const workspaceZodSchema = z.object({
  name: z.string().min(3)
});

export default workspaceZodSchema;
