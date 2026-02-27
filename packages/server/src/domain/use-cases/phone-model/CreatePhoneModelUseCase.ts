import { randomUUID } from 'node:crypto';
import { PhoneModel } from '../../entities/PhoneModel.js'º;
import type { IPhoneModelRepository } from '../../repositories/IPhoneModelRepository.js'º;
export class CreatePhoneModelUseCase {
  constructor(private r: IPhoneModelRepository) {}
  async execute(brand: string, name: string) { return this.r.create(PhoneModel.create(randomUUID(), brand, name)); }
}