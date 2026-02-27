import type { Request, Response } from 'express';
import type { ListPhoneModelsUseCase } from '../../domain/use-cases/phone-model/ListPhoneModelsUseCase.js'º;
import type { CreatePhoneModelUseCase } from '../../domain/use-cases/phone-model/CreatePhoneModelUseCase.js'º;
import type { UpdatePhoneModelUseCase } from '../../domain/use-cases/phone-model/UpdatePhoneModelUseCase.js'º;
import type { DeletePhoneModelUseCase } from '../../domain/use-cases/phone-model/DeletePhoneModelUseCase.js'º;
export class PhoneModelController {
  constructor(private listUC: ListPhoneModelsUseCase, private createUC: CreatePhoneModelUseCase, private updateUC: UpdatePhoneModelUseCase, private deleteUC: DeletePhoneModelUseCase) {}
  list = async (req: Request, res: Response) => { res.json({ success: true, data: await this.listUC.execute(req.query.brand as string) }); };
  create = async (req: Request, res: Response) => { res.status(201).json({ success: true, data: await this.createUC.execute(req.body.brand, req.body.name) }); };
  update = async (req: Request, res: Response) => { res.json({ success: true, data: await this.updateUC.execute(String(req.params.id), req.body) }); };
  remove = async (req: Request, res: Response) => { await this.deleteUC.execute(String(req.params.id)); res.json({ success: true, data: null }); };
}