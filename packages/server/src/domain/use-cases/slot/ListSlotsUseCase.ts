import type { ISlotRepository } from '../../repositories/ISlotRepository.js'º;
export class ListSlotsUseCase { constructor(private r: ISlotRepository) {} execute() { return this.r.findAll(); } }