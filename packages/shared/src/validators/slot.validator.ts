import { z } from 'zod';
export const createSlotSchema = z.object({ label: z.string().min(1, 'Label obrigatoria').max(50) });
export const updateSlotSchema = createSlotSchema.partial();
export type CreateSlotDTO = z.infer<typeof createSlotSchema>;
export type UpdateSlotDTO = z.infer<typeof updateSlotSchema>;