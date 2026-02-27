import { Prisma } from '@prisma/client';
import { prisma } from '../prisma-client';
import { Product } from '../../../domain/entities/Product';
import type { IProductRepository, ProductSearchResult } from '../../../domain/repositories/IProductRepository';
import type { SearchProductsDTO, ProductWithRelations } from '@cellstore/shared';
export class PrismaProductRepository implements IProductRepository {
  async findById(id: string) { const r = await prisma.product.findUnique({ where: { id } }); return r ? this.toD(r) : null; }
  async create(p: Product) { const r = await prisma.product.create({ data: { id: p.id, categoryId: p.categoryId, phoneModelId: p.phoneModelId, slotId: p.slotId, name: p.name, price: new Prisma.Decimal(p.price), stock: p.stock, isActive: p.isActive } }); return this.toD(r); }
  async update(p: Product) { const r = await prisma.product.update({ where: { id: p.id }, data: { name: p.name, price: new Prisma.Decimal(p.price), stock: p.stock, isActive: p.isActive, slotId: p.slotId } }); return this.toD(r); }
  async delete(id: string) { await prisma.product.delete({ where: { id } }); }
  async search(f: SearchProductsDTO): Promise<ProductSearchResult> {
    const page = f.page ?? 1; const limit = f.limit ?? 20; const skip = (page - 1) * limit;
    const where: Prisma.ProductWhereInput = {};
    if (f.categoryId) where.categoryId = f.categoryId;
    if (f.phoneModelId) where.phoneModelId = f.phoneModelId;
    if (f.slotId) where.slotId = f.slotId;
    if (f.inStock) where.stock = { gt: 0 };
    if (f.search) {
      where.OR = [
        { name: { contains: f.search, mode: 'insensitive' } },
        { phoneModel: { name: { contains: f.search, mode: 'insensitive' } } },
        { phoneModel: { brand: { contains: f.search, mode: 'insensitive' } } },
        { category: { name: { contains: f.search, mode: 'insensitive' } } },
      ];
    }
    const [records, total] = await Promise.all([
      prisma.product.findMany({ where, skip, take: limit, orderBy: { createdAt: 'desc' },
        include: { category: { select: { id: true, name: true } }, phoneModel: { select: { id: true, brand: true, name: true } }, slot: { select: { id: true, label: true } } },
      }),
      prisma.product.count({ where }),
    ]);
    const data: ProductWithRelations[] = records.map((r) => ({
      id: r.id, categoryId: r.categoryId, phoneModelId: r.phoneModelId, slotId: r.slotId,
      name: r.name, price: Number(r.price), stock: r.stock, isActive: r.isActive,
      createdAt: r.createdAt, updatedAt: r.updatedAt,
      category: r.category, phoneModel: r.phoneModel, slot: r.slot,
    }));
    return { data, total };
  }
  private toD(r: any) { return new Product(r.id, r.categoryId, r.phoneModelId, r.slotId, r.name, Number(r.price), r.stock, r.isActive, r.createdAt, r.updatedAt); }
}