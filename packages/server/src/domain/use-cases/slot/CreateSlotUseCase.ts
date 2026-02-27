import { randomUUID } from 'node:crypto';
import { Slot } from '../../entities/Slot.js'º;
import type { ISlotRepository } from '../../repositories/ISlotRepository.js'º;
export class CreateSlotUseCase {
  constructor(private r: ISlotRepository) {}
  async execute(label: string) { if (await this.r.findByLabel(label)) throw new Error('Gancho ja existe'); return this.r.create(Slot.create(randomUUID(), label)); }
}