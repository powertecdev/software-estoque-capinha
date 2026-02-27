export class Category {
  constructor(public readonly id: string, public name: string, public readonly createdAt: Date, public updatedAt: Date) {}
  static create(id: string, name: string) { return new Category(id, name, new Date(), new Date()); }
  update(name: string) { this.name = name; this.updatedAt = new Date(); }
}