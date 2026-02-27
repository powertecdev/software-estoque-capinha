import { api } from './api.js'º;
import type { Category, PhoneModel, Slot, ProductWithRelations, StockMovement, MovementWithProduct, ApiResponse, PaginationMeta } from '@cellstore/shared';

// Categories
export const getCategories = async (): Promise<Category[]> => { const { data } = await api.get<ApiResponse<Category[]>>('/categories'); return data.data; };
export const createCategory = async (name: string): Promise<Category> => { const { data } = await api.post<ApiResponse<Category>>('/categories', { name }); return data.data; };
export const updateCategory = async (id: string, name: string): Promise<Category> => { const { data } = await api.put<ApiResponse<Category>>(`/categories/${id}`, { name }); return data.data; };
export const deleteCategory = async (id: string): Promise<void> => { await api.delete(`/categories/${id}`); };

// Phone Models
export const getPhoneModels = async (brand?: string): Promise<PhoneModel[]> => { const { data } = await api.get<ApiResponse<PhoneModel[]>>('/phone-models', { params: brand ? { brand } : {} }); return data.data; };
export const createPhoneModel = async (brand: string, name: string): Promise<PhoneModel> => { const { data } = await api.post<ApiResponse<PhoneModel>>('/phone-models', { brand, name }); return data.data; };
export const updatePhoneModel = async (id: string, input: { brand?: string; name?: string }): Promise<PhoneModel> => { const { data } = await api.put<ApiResponse<PhoneModel>>(`/phone-models/${id}`, input); return data.data; };
export const deletePhoneModel = async (id: string): Promise<void> => { await api.delete(`/phone-models/${id}`); };

// Slots
export const getSlots = async (): Promise<Slot[]> => { const { data } = await api.get<ApiResponse<Slot[]>>('/slots'); return data.data; };
export const createSlot = async (label: string): Promise<Slot> => { const { data } = await api.post<ApiResponse<Slot>>('/slots', { label }); return data.data; };
export const updateSlot = async (id: string, label: string): Promise<Slot> => { const { data } = await api.put<ApiResponse<Slot>>(`/slots/${id}`, { label }); return data.data; };
export const deleteSlot = async (id: string): Promise<void> => { await api.delete(`/slots/${id}`); };

// Products
export interface SearchResult { products: ProductWithRelations[]; meta: PaginationMeta; }
export const searchProducts = async (params: Record<string, any> = {}): Promise<SearchResult> => {
  const clean = Object.fromEntries(Object.entries(params).filter(([_, v]) => v !== undefined && v !== '' && v !== null));
  const { data } = await api.get<ApiResponse<ProductWithRelations[]> & { meta: PaginationMeta }>('/products', { params: clean });
  return { products: data.data, meta: data.meta || { page: 1, limit: 20, total: 0, totalPages: 0 } };
};
export const createProduct = async (input: { categoryId: string; phoneModelId: string; slotId: string; name: string; price: number; stock: number }): Promise<ProductWithRelations> => {
  const { data } = await api.post<ApiResponse<ProductWithRelations>>('/products', input); return data.data;
};
export const updateProduct = async (id: string, input: { name?: string; price?: number; isActive?: boolean; slotId?: string }): Promise<ProductWithRelations> => {
  const { data } = await api.put<ApiResponse<ProductWithRelations>>(`/products/${id}`, input); return data.data;
};
export const deleteProduct = async (id: string): Promise<void> => { await api.delete(`/products/${id}`); };

// Movements
export interface MovementsResult { movements: MovementWithProduct[]; meta: PaginationMeta; }
export const getMovements = async (page = 1, limit = 20): Promise<MovementsResult> => {
  const { data } = await api.get<ApiResponse<MovementWithProduct[]> & { meta: PaginationMeta }>('/movements', { params: { page, limit } });
  return { movements: data.data, meta: data.meta || { page: 1, limit: 20, total: 0, totalPages: 0 } };
};
export const getProductMovements = async (productId: string): Promise<StockMovement[]> => {
  const { data } = await api.get<ApiResponse<StockMovement[]>>(`/movements/product/${productId}`); return data.data;
};
export const createMovement = async (input: { productId: string; type: 'ENTRY' | 'EXIT'; quantity: number; reason?: string }): Promise<StockMovement> => {
  const { data } = await api.post<ApiResponse<StockMovement>>('/movements', input); return data.data;
};