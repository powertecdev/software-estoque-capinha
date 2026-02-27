import type { UpdateProductDTO } from '@cellstore/shared';
import type { IProductRepository } from '../../repositories/IProductRepository.js'º;
export class UpdateProductUseCase {
  constructor(private r: IProductRepository) {}
  async execute(id: string, d: UpdateProductDTO) { const p = await this.r.findById(id); if (!p) throw new Error('Produto nao encontrado'); p.update(d); return this.r.update(p); }
}