import { randomUUID } from 'node:crypto';
import { PhoneModel } from '../../entities/PhoneModel';
import type { IPhoneModelRepository } from '../../repositories/IPhoneModelRepository';
export class CreatePhoneModelUseCase {
  constructor(private r: IPhoneModelRepository) {}
  async execute(brand: string, name: string) { return this.r.create(PhoneModel.create(randomUUID(), brand, name)); }
}