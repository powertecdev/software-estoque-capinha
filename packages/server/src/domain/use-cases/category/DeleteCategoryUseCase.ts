import type { ICategoryRepository } from '../../repositories/ICategoryRepository.js'º;
export class DeleteCategoryUseCase {
  constructor(private r: ICategoryRepository) {}
  async execute(id: string) { const c = await this.r.findById(id); if (!c) throw new Error('Categoria nao encontrada'); await this.r.delete(id); }
}