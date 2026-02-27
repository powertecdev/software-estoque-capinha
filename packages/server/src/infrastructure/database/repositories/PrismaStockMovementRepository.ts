import { prisma } from '../prisma-client.js'º;
import { StockMovement } from '../../../domain/entities/StockMovement.js'º;
import type { IStockMovementRepository } from '../../../domain/repositories/IStockMovementRepository.js'º;
import type { MovementWithProduct } from '@cellstore/shared';
export class PrismaStockMovementRepository implements IStockMovementRepository {
  async create(m: StockMovement) { const r = await prisma.stockMovement.create({ data: { id: m.id, productId: m.productId, type: m.type, quantity: m.quantity, reason: m.reason } }); return new StockMovement(r.id, r.productId, r.type, r.quantity, r.reason, r.createdAt); }
  async findByProductId(productId: string) { const rs = await prisma.stockMovement.findMany({ where: { productId }, orderBy: { createdAt: 'desc' } }); return rs.map(r => new StockMovement(r.id, r.productId, r.type, r.quantity, r.reason, r.createdAt)); }
  async findAll(page: number, limit: number) {
    const skip = (page - 1) * limit;
    const [records, total] = await Promise.all([
      prisma.stockMovement.findMany({ skip, take: limit, orderBy: { createdAt: 'desc' },
        include: { product: { select: { id: true, name: true, category: { select: { name: true } }, phoneModel: { select: { brand: true, name: true } }, slot: { select: { label: true } } } } },
      }),
      prisma.stockMovement.count(),
    ]);
    const data: MovementWithProduct[] = records.map(r => ({ id: r.id, productId: r.productId, type: r.type, quantity: r.quantity, reason: r.reason, createdAt: r.createdAt, product: r.product }));
    return { data, total };
  }
}