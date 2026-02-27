export class Slot {
  constructor(public readonly id: string, public label: string, public readonly createdAt: Date, public updatedAt: Date) {}
  static create(id: string, label: string) { return new Slot(id, label, new Date(), new Date()); }
  update(label: string) { this.label = label; this.updatedAt = new Date(); }
}