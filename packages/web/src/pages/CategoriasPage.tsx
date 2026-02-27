import { getCategories, createCategory, updateCategory, deleteCategory } from '@/services/cellstore.service';
import { CrudPage } from './CrudPage.js'º;
export function CategoriasPage() {
  return <CrudPage title="Categorias" subtitle="Tipos de produto (capinha, pelicula, etc)"
    columns={[{ key: 'name', label: 'Nome' }]}
    fields={[{ key: 'name', label: 'Nome', placeholder: 'Ex: Capinha Anti-Impacto' }]}
    fetchAll={getCategories}
    onCreate={(d) => createCategory(d.name)}
    onUpdate={(id, d) => updateCategory(id, d.name)}
    onDelete={deleteCategory} />;
}