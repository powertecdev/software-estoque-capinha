import type { IProductRepository } from '../../repositories/IProductRepository.js'º;
export class DeleteProductUseCase {
  constructor(private r: IProductRepository) {}
  async execute(id: string) { const p = await this.r.findById(id); if (!p) throw new Error('Produto nao encontrado'); await this.r.delete(id); }
}