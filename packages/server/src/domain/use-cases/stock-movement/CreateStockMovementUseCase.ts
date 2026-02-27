import { randomUUID } from 'node:crypto';
import { StockMovement } from '../../entities/StockMovement';
import type { IStockMovementRepository } from '../../repositories/IStockMovementRepository';
import type { IProductRepository } from '../../repositories/IProductRepository';
import type { CreateMovementDTO } from '@cellstore/shared';
export class CreateStockMovementUseCase {
  constructor(private mr: IStockMovementRepository, private pr: IProductRepository) {}
  async execute(d: CreateMovementDTO) {
    const product = await this.pr.findById(d.productId);
    if (!product) throw new Error('Produto nao encontrado');
    if (d.type === 'EXIT' && product.stock < d.quantity) throw new Error('Estoque insuficiente. Disponivel: ' + product.stock);
    const mov = StockMovement.create({ id: randomUUID(), ...d });
    const created = await this.mr.create(mov);
    if (d.type === 'ENTRY') product.addStock(d.quantity); else product.removeStock(d.quantity);
    await this.pr.update(product);
    return created;
  }
}