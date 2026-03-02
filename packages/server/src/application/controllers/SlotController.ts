import type { Request, Response } from 'express';
import type { ListSlotsUseCase } from '../../domain/use-cases/slot/ListSlotsUseCase';
import type { CreateSlotUseCase } from '../../domain/use-cases/slot/CreateSlotUseCase';
import type { UpdateSlotUseCase } from '../../domain/use-cases/slot/UpdateSlotUseCase';
import type { DeleteSlotUseCase } from '../../domain/use-cases/slot/DeleteSlotUseCase';
export class SlotController {
  constructor(private listUC: ListSlotsUseCase, private createUC: CreateSlotUseCase, private updateUC: UpdateSlotUseCase, private deleteUC: DeleteSlotUseCase) {}
  list = async (_req: Request, res: Response) => { res.json({ success: true, data: await this.listUC.execute() }); };
  create = async (req: Request, res: Response) => { res.status(201).json({ success: true, data: await this.createUC.execute(req.body.label) }); };
  update = async (req: Request, res: Response) => { res.json({ success: true, data: await this.updateUC.execute(String(req.params.id), req.body.label) }); };
  remove = async (req: Request, res: Response) => { await this.deleteUC.execute(String(req.params.id)); res.json({ success: true, data: null }); };
}