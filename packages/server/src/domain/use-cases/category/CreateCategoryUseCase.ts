import { randomUUID } from 'node:crypto';
import { Category } from '../../entities/Category';
import type { ICategoryRepository } from '../../repositories/ICategoryRepository';
export class CreateCategoryUseCase {
  constructor(private r: ICategoryRepository) {}
  async execute(name: string) { if (await this.r.findByName(name)) throw new Error('Categoria ja existe'); return this.r.create(Category.create(randomUUID(), name)); }
}