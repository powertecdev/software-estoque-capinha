import { describe, it, expect, beforeEach } from 'vitest';
import { CreateCategoryUseCase } from '../../src/domain/use-cases/category/CreateCategoryUseCase.js'º;
import { Category } from '../../src/domain/entities/Category.js'º;
import type { ICategoryRepository } from '../../src/domain/repositories/ICategoryRepository.js'º;

class MockCategoryRepository implements ICategoryRepository {
  private categories: Category[] = [];

  async findAll() { return this.categories; }
  async findById(id: string) { return this.categories.find(c => c.id === id) ?? null; }
  async findBySlug(slug: string) { return this.categories.find(c => c.slug === slug) ?? null; }
  async create(category: Category) { this.categories.push(category); return category; }
  async update(category: Category) { return category; }
  async delete(_id: string) {}
}

describe('CreateCategoryUseCase', () => {
  let useCase: CreateCategoryUseCase;
  let mockRepo: MockCategoryRepository;

  beforeEach(() => {
    mockRepo = new MockCategoryRepository();
    useCase = new CreateCategoryUseCase(mockRepo);
  });

  it('should create a new category', async () => {
    const result = await useCase.execute({
      name: 'Capinha',
      slug: 'capinha',
      description: 'Capinhas protetoras',
    });

    expect(result).toBeInstanceOf(Category);
    expect(result.name).toBe('Capinha');
    expect(result.slug).toBe('capinha');
    expect(result.id).toBeDefined();
  });

  it('should throw error when slug already exists', async () => {
    await useCase.execute({ name: 'Capinha', slug: 'capinha' });

    await expect(
      useCase.execute({ name: 'Capinha 2', slug: 'capinha' }),
    ).rejects.toThrow('Já existe uma categoria com esse slug');
  });
});
