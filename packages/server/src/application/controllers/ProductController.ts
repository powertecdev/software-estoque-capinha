import type { Request, Response } from 'express';
import { searchProductsSchema } from '@cellstore/shared';
import type { SearchProductsUseCase } from '../../domain/use-cases/product/SearchProductsUseCase';
import type { CreateProductUseCase } from '../../domain/use-cases/product/CreateProductUseCase';
import type { UpdateProductUseCase } from '../../domain/use-cases/product/UpdateProductUseCase';
import type { DeleteProductUseCase } from '../../domain/use-cases/product/DeleteProductUseCase';
export class ProductController {
  constructor(private searchUC: SearchProductsUseCase, private createUC: CreateProductUseCase, private updateUC: UpdateProductUseCase, private deleteUC: DeleteProductUseCase) {}
  search = async (req: Request, res: Response) => {
    const f = searchProductsSchema.parse(req.query);
    const { data, total } = await this.searchUC.execute(f);
    const totalPages = Math.ceil(total / (f.limit ?? 20));
    res.json({ success: true, data, meta: { page: f.page, limit: f.limit, total, totalPages } });
  };
  create = async (req: Request, res: Response) => { res.status(201).json({ success: true, data: await this.createUC.execute(req.body) }); };
  update = async (req: Request, res: Response) => { res.json({ success: true, data: await this.updateUC.execute(String(req.params.id), req.body) }); };
  remove = async (req: Request, res: Response) => { await this.deleteUC.execute(String(req.params.id)); res.json({ success: true, data: null }); };
}