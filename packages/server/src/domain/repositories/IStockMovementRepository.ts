import type { MovementWithProduct } from '@cellstore/shared';
import { StockMovement } from '../entities/StockMovement.js'º;
export interface IStockMovementRepository { create(m: StockMovement): Promise<StockMovement>; findByProductId(productId: string): Promise<StockMovement[]>; findAll(page: number, limit: number): Promise<{ data: MovementWithProduct[]; total: number }>; }