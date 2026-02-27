import { z } from 'zod';
export const createMovementSchema = z.object({
  productId: z.string().uuid('ID do produto invalido'),
  type: z.enum(['ENTRY', 'EXIT'], { errorMap: () => ({ message: 'Tipo deve ser ENTRY ou EXIT' }) }),
  quantity: z.number().int().positive('Quantidade deve ser positiva'),
  reason: z.string().max(500).optional(),
});
export type CreateMovementDTO = z.infer<typeof createMovementSchema>;