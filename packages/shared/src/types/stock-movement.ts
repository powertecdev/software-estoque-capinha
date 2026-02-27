export type MovementType = 'ENTRY' | 'EXIT';
export interface StockMovement {
  id: string;
  productId: string;
  type: MovementType;
  quantity: number;
  reason: string | null;
  createdAt: Date;
}
export interface CreateMovementInput {
  productId: string;
  type: MovementType;
  quantity: number;
  reason?: string;
}
export interface MovementWithProduct extends StockMovement {
  product: { id: string; name: string; category: { name: string }; phoneModel: { brand: string; name: string }; slot: { label: string } };
}