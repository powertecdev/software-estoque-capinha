import type { IPhoneModelRepository } from '../../repositories/IPhoneModelRepository';
export class UpdatePhoneModelUseCase {
  constructor(private r: IPhoneModelRepository) {}
  async execute(id: string, props: { brand?: string; name?: string }) { const p = await this.r.findById(id); if (!p) throw new Error('Modelo nao encontrado'); p.update(props); return this.r.update(p); }
}