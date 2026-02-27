import type { ISlotRepository } from '../../repositories/ISlotRepository';
export class DeleteSlotUseCase {
  constructor(private r: ISlotRepository) {}
  async execute(id: string) { const s = await this.r.findById(id); if (!s) throw new Error('Gancho nao encontrado'); await this.r.delete(id); }
}