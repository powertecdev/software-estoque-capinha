export interface Slot {
  id: string;
  label: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface CreateSlotInput { label: string; }
export interface UpdateSlotInput { label?: string; }