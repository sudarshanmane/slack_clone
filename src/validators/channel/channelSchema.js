import { z } from 'zod';

const channelZodSchema = z.object({
  name: z.string().min(3)
});

export default channelZodSchema;
