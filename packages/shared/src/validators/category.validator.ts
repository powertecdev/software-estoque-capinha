import { z } from 'zod';
export const createCategorySchema = z.object({ name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres').max(100) });
export const updateCategorySchema = createCategorySchema.partial();
export type CreateCategoryDTO = z.infer<typeof createCategorySchema>;
export type UpdateCategoryDTO = z.infer<typeof updateCategorySchema>;