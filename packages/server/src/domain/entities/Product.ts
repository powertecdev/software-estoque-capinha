export class Product {
  constructor(public readonly id: string, public categoryId: string, public phoneModelId: string, public slotId: string, public name: string, public price: number, public stock: number, public isActive: boolean, public readonly createdAt: Date, public updatedAt: Date) {}
  static create(props: { id: string; categoryId: string; phoneModelId: string; slotId: string; name: string; price: number; stock: number }) {
    return new Product(props.id, props.categoryId, props.phoneModelId, props.slotId, props.name, props.price, props.stock, true, new Date(), new Date());
  }
  addStock(qty: number) { this.stock += qty; this.updatedAt = new Date(); }
  removeStock(qty: number) { if (qty > this.stock) throw new Error('Estoque insuficiente'); this.stock -= qty; this.updatedAt = new Date(); }
  update(props: { name?: string; price?: number; isActive?: boolean; slotId?: string }) {
    if (props.name) this.name = props.name;
    if (props.price !== undefined) this.price = props.price;
    if (props.isActive !== undefined) this.isActive = props.isActive;
    if (props.slotId) this.slotId = props.slotId;
    this.updatedAt = new Date();
  }
}