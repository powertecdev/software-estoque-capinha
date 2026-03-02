import type { ICategoryRepository } from '../../repositories/ICategoryRepository';
export class UpdateCategoryUseCase {
  constructor(private r: ICategoryRepository) {}
  async execute(id: string, name: string) { const c = await this.r.findById(id); if (!c) throw new Error('Categoria nao encontrada'); c.update(name); return this.r.update(c); }
}