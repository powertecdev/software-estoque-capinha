import type { SearchProductsDTO } from '@cellstore/shared';
import type { IProductRepository } from '../../repositories/IProductRepository';
export class SearchProductsUseCase { constructor(private r: IProductRepository) {} execute(f: SearchProductsDTO) { return this.r.search(f); } }