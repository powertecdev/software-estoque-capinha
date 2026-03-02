import type { ISlotRepository } from '../../repositories/ISlotRepository';
export class ListSlotsUseCase { constructor(private r: ISlotRepository) {} execute() { return this.r.findAll(); } }