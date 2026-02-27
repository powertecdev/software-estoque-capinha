import { getSlots, createSlot, updateSlot, deleteSlot } from '@/services/cellstore.service';
import { CrudPage } from './CrudPage.js'º;
export function GanchosPage() {
  return <CrudPage title="Ganchos / Posicoes" subtitle="Posicoes fisicas no painel da loja"
    columns={[{ key: 'label', label: 'Identificacao' }]}
    fields={[{ key: 'label', label: 'Identificacao', placeholder: 'Ex: Gancho 1' }]}
    fetchAll={getSlots}
    onCreate={(d) => createSlot(d.label)}
    onUpdate={(id, d) => updateSlot(id, d.label)}
    onDelete={deleteSlot} />;
}