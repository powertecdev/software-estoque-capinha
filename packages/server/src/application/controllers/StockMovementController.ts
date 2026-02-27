import type { Request, Response } from 'express';
import type { CreateStockMovementUseCase } from '../../domain/use-cases/stock-movement/CreateStockMovementUseCase.js'º;
import type { ListStockMovementsUseCase } from '../../domain/use-cases/stock-movement/ListStockMovementsUseCase.js'º;
import type { GetProductMovementsUseCase } from '../../domain/use-cases/stock-movement/GetProductMovementsUseCase.js'º;
export class StockMovementController {
  constructor(private createUC: CreateStockMovementUseCase, private listUC: ListStockMovementsUseCase, private prodMovUC: GetProductMovementsUseCase) {}
  list = async (req: Request, res: Response) => {
    const page = Number(req.query.page) || 1; const limit = Number(req.query.limit) || 20;
    const { data, total } = await this.listUC.execute(page, limit);
    res.json({ success: true, data, meta: { page, limit, total, totalPages: Math.ceil(total / limit) } });
  };
  byProduct = async (req: Request, res: Response) => { res.json({ success: true, data: await this.prodMovUC.execute(String(req.params.productId)) }); };
  create = async (req: Request, res: Response) => { res.status(201).json({ success: true, data: await this.createUC.execute(req.body) }); };
}