import { randomUUID } from 'crypto';
import { Slot } from '../../entities/Slot';
import type { ISlotRepository } from '../../repositories/ISlotRepository';
export class CreateSlotUseCase {
  constructor(private r: ISlotRepository) {}
  async execute(label: string) { if (await this.r.findByLabel(label)) throw new Error('Gancho ja existe'); return this.r.create(Slot.create(randomUUID(), label)); }
}