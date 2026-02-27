import { getPhoneModels, createPhoneModel, updatePhoneModel, deletePhoneModel } from '@/services/cellstore.service';
import { CrudPage } from './CrudPage';
export function ModelosPage() {
  return <CrudPage title="Modelos de Celular" subtitle="Cadastre os modelos disponiveis"
    columns={[{ key: 'brand', label: 'Marca' }, { key: 'name', label: 'Modelo' }]}
    fields={[{ key: 'brand', label: 'Marca', placeholder: 'Ex: Samsung' }, { key: 'name', label: 'Modelo', placeholder: 'Ex: Galaxy S24' }]}
    fetchAll={getPhoneModels}
    onCreate={(d) => createPhoneModel(d.brand, d.name)}
    onUpdate={(id, d) => updatePhoneModel(id, d)}
    onDelete={deletePhoneModel} />;
}