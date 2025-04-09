import { z } from 'zod';

const workspaceMemberZodSchema = z.object({
  memberId: z.string(),
  role: z.enum(['admin', 'member'])
});

export default workspaceMemberZodSchema;
