import { z } from "zod";

export type RunCodeDto = z.infer<typeof runCodeZodSchema>;

export const runCodeZodSchema = z.object({
  language: z.enum(["cpp", "java", "python"]),
  code: z.string().min(1),
  input: z.string().optional().default(""),
}).strict();

