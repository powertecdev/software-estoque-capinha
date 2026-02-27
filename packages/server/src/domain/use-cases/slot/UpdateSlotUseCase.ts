import type { ISlotRepository } from '../../repositories/ISlotRepository';
export class UpdateSlotUseCase {
  constructor(private r: ISlotRepository) {}
  async execute(id: string, label: string) { const s = await this.r.findById(id); if (!s) throw new Error('Gancho nao encontrado'); s.update(label); return this.r.update(s); }
}