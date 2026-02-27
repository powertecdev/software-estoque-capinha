export interface PhoneModel {
  id: string;
  brand: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface CreatePhoneModelInput { brand: string; name: string; }
export interface UpdatePhoneModelInput { brand?: string; name?: string; }