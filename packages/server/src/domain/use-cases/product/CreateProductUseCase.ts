import { randomUUID } from 'node:crypto';
import { Product } from '../../entities/Product';
import type { IProductRepository } from '../../repositories/IProductRepository';
import type { CreateProductDTO } from '@cellstore/shared';
export class CreateProductUseCase {
  constructor(private r: IProductRepository) {}
  async execute(d: CreateProductDTO) {
    return this.r.create(Product.create({
      id: randomUUID(),
      categoryId: d.categoryId,
      phoneModelId: d.phoneModelId,
      slotId: d.slotId,
      name: d.name,
      price: d.price,
      stock: d.stock,
    }));
  }
}