export interface Product {
  id: string;
  categoryId: string;
  phoneModelId: string;
  slotId: string;
  name: string;
  price: number;
  stock: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
export interface CreateProductInput {
  categoryId: string;
  phoneModelId: string;
  slotId: string;
  name: string;
  price: number;
  stock: number;
}
export interface UpdateProductInput {
  name?: string;
  price?: number;
  isActive?: boolean;
  slotId?: string;
}
export interface ProductWithRelations extends Product {
  category: { id: string; name: string };
  phoneModel: { id: string; brand: string; name: string };
  slot: { id: string; label: string };
}