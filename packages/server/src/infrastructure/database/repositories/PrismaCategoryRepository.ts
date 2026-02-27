import { prisma } from '../prisma-client';
import { Category } from '../../../domain/entities/Category';
import type { ICategoryRepository } from '../../../domain/repositories/ICategoryRepository';
export class PrismaCategoryRepository implements ICategoryRepository {
  async findAll() { const r = await prisma.category.findMany({ orderBy: { name: 'asc' } }); return r.map(this.toD); }
  async findById(id: string) { const r = await prisma.category.findUnique({ where: { id } }); return r ? this.toD(r) : null; }
  async findByName(name: string) { const r = await prisma.category.findUnique({ where: { name } }); return r ? this.toD(r) : null; }
  async create(c: Category) { const r = await prisma.category.create({ data: { id: c.id, name: c.name } }); return this.toD(r); }
  async update(c: Category) { const r = await prisma.category.update({ where: { id: c.id }, data: { name: c.name } }); return this.toD(r); }
  async delete(id: string) { await prisma.category.delete({ where: { id } }); }
  private toD(r: any) { return new Category(r.id, r.name, r.createdAt, r.updatedAt); }
}