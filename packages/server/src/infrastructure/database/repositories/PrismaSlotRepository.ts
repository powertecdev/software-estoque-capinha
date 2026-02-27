import { prisma } from '../prisma-client';
import { Slot } from '../../../domain/entities/Slot';
import type { ISlotRepository } from '../../../domain/repositories/ISlotRepository';
export class PrismaSlotRepository implements ISlotRepository {
  async findAll() { const r = await prisma.slot.findMany({ orderBy: { label: 'asc' } }); return r.map(this.toD); }
  async findById(id: string) { const r = await prisma.slot.findUnique({ where: { id } }); return r ? this.toD(r) : null; }
  async findByLabel(label: string) { const r = await prisma.slot.findUnique({ where: { label } }); return r ? this.toD(r) : null; }
  async create(s: Slot) { const r = await prisma.slot.create({ data: { id: s.id, label: s.label } }); return this.toD(r); }
  async update(s: Slot) { const r = await prisma.slot.update({ where: { id: s.id }, data: { label: s.label } }); return this.toD(r); }
  async delete(id: string) { await prisma.slot.delete({ where: { id } }); }
  private toD(r: any) { return new Slot(r.id, r.label, r.createdAt, r.updatedAt); }
}