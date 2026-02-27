export class PhoneModel {
  constructor(public readonly id: string, public brand: string, public name: string, public readonly createdAt: Date, public updatedAt: Date) {}
  static create(id: string, brand: string, name: string) { return new PhoneModel(id, brand, name, new Date(), new Date()); }
  update(props: { brand?: string; name?: string }) { if (props.brand) this.brand = props.brand; if (props.name) this.name = props.name; this.updatedAt = new Date(); }
}