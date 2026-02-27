import { z } from 'zod';
export const createProductSchema = z.object({
  categoryId: z.string().uuid('ID da categoria invalido'),
  phoneModelId: z.string().uuid('ID do modelo invalido'),
  slotId: z.string().uuid('ID do gancho invalido'),
  name: z.string().min(2).max(200),
  price: z.number().positive('Preco deve ser positivo'),
  stock: z.number().int().min(0, 'Estoque nao pode ser negativo'),
});
export const updateProductSchema = z.object({
  name: z.string().min(2).max(200).optional(),
  price: z.number().positive().optional(),
  isActive: z.boolean().optional(),
  slotId: z.string().uuid().optional(),
});
export const searchProductsSchema = z.object({
  categoryId: z.string().uuid().optional(),
  phoneModelId: z.string().uuid().optional(),
  slotId: z.string().uuid().optional(),
  search: z.string().max(200).optional(),
  inStock: z.coerce.boolean().optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});
export type CreateProductDTO = z.infer<typeof createProductSchema>;
export type UpdateProductDTO = z.infer<typeof updateProductSchema>;
export type SearchProductsDTO = z.infer<typeof searchProductsSchema>;