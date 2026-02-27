import { prisma } from '../prisma-client.js'º;
import { PhoneModel } from '../../../domain/entities/PhoneModel.js'º;
import type { IPhoneModelRepository } from '../../../domain/repositories/IPhoneModelRepository.js'º;
export class PrismaPhoneModelRepository implements IPhoneModelRepository {
  async findAll(brand?: string) { const r = await prisma.phoneModel.findMany({ where: brand ? { brand: { contains: brand, mode: 'insensitive' } } : undefined, orderBy: [{ brand: 'asc' }, { name: 'asc' }] }); return r.map(this.toD); }
  async findById(id: string) { const r = await prisma.phoneModel.findUnique({ where: { id } }); return r ? this.toD(r) : null; }
  async create(p: PhoneModel) { const r = await prisma.phoneModel.create({ data: { id: p.id, brand: p.brand, name: p.name } }); return this.toD(r); }
  async update(p: PhoneModel) { const r = await prisma.phoneModel.update({ where: { id: p.id }, data: { brand: p.brand, name: p.name } }); return this.toD(r); }
  async delete(id: string) { await prisma.phoneModel.delete({ where: { id } }); }
  private toD(r: any) { return new PhoneModel(r.id, r.brand, r.name, r.createdAt, r.updatedAt); }
}