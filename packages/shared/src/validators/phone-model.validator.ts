import { z } from 'zod';
export const createPhoneModelSchema = z.object({ brand: z.string().min(1, 'Marca obrigatoria').max(100), name: z.string().min(1, 'Nome obrigatorio').max(200) });
export const updatePhoneModelSchema = createPhoneModelSchema.partial();
export type CreatePhoneModelDTO = z.infer<typeof createPhoneModelSchema>;
export type UpdatePhoneModelDTO = z.infer<typeof updatePhoneModelSchema>;