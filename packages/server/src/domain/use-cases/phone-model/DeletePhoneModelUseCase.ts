import type { IPhoneModelRepository } from '../../repositories/IPhoneModelRepository';
export class DeletePhoneModelUseCase {
  constructor(private r: IPhoneModelRepository) {}
  async execute(id: string) { const p = await this.r.findById(id); if (!p) throw new Error('Modelo nao encontrado'); await this.r.delete(id); }
}