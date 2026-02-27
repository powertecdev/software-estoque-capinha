import type { MovementType } from '@cellstore/shared';
export class StockMovement {
  constructor(public readonly id: string, public productId: string, public type: MovementType, public quantity: number, public reason: string | null, public readonly createdAt: Date) {}
  static create(props: { id: string; productId: string; type: MovementType; quantity: number; reason?: string }) {
    return new StockMovement(props.id, props.productId, props.type, props.quantity, props.reason ?? null, new Date());
  }
}