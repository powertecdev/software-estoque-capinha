import { Product } from '../entities/Product';
import type { ProductWithRelations, SearchProductsDTO } from '@cellstore/shared';
export interface ProductSearchResult { data: ProductWithRelations[]; total: number; }
export interface IProductRepository { findById(id: string): Promise<Product | null>; create(p: Product): Promise<Product>; update(p: Product): Promise<Product>; delete(id: string): Promise<void>; search(filters: SearchProductsDTO): Promise<ProductSearchResult>; }