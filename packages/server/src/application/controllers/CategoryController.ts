import type { Request, Response } from 'express';
import type { ListCategoriesUseCase } from '../../domain/use-cases/category/ListCategoriesUseCase.js'º;
import type { CreateCategoryUseCase } from '../../domain/use-cases/category/CreateCategoryUseCase.js'º;
import type { UpdateCategoryUseCase } from '../../domain/use-cases/category/UpdateCategoryUseCase.js'º;
import type { DeleteCategoryUseCase } from '../../domain/use-cases/category/DeleteCategoryUseCase.js'º;
export class CategoryController {
  constructor(private listUC: ListCategoriesUseCase, private createUC: CreateCategoryUseCase, private updateUC: UpdateCategoryUseCase, private deleteUC: DeleteCategoryUseCase) {}
  list = async (_req: Request, res: Response) => { res.json({ success: true, data: await this.listUC.execute() }); };
  create = async (req: Request, res: Response) => { res.status(201).json({ success: true, data: await this.createUC.execute(req.body.name) }); };
  update = async (req: Request, res: Response) => { res.json({ success: true, data: await this.updateUC.execute(String(req.params.id), req.body.name) }); };
  remove = async (req: Request, res: Response) => { await this.deleteUC.execute(String(req.params.id)); res.json({ success: true, data: null }); };
}