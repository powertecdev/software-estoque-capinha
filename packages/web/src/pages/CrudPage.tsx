import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { Button, Spinner, Modal } from '@/components/ui';

interface Item { id: string; [key: string]: any; }
interface CrudPageProps<T extends Item> {
  title: string; subtitle: string;
  columns: { key: string; label: string }[];
  fetchAll: () => Promise<T[]>;
  onCreate: (data: Record<string, string>) => Promise<T>;
  onUpdate: (id: string, data: Record<string, string>) => Promise<T>;
  onDelete: (id: string) => Promise<void>;
  fields: { key: string; label: string; placeholder: string }[];
}

export function CrudPage<T extends Item>({ title, subtitle, columns, fetchAll, onCreate, onUpdate, onDelete, fields }: CrudPageProps<T>) {
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<T | null>(null);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const load = async () => { setLoading(true); try { const result = await fetchAll(); setItems(result || []); } finally { setLoading(false); } };
  useEffect(() => { load(); }, []);

  const openCreate = () => { setEditing(null); setFormData(Object.fromEntries(fields.map(f => [f.key, '']))); setError(''); setShowForm(true); };
  const openEdit = (item: T) => { setEditing(item); setFormData(Object.fromEntries(fields.map(f => [f.key, item[f.key] || '']))); setError(''); setShowForm(true); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setSaving(true); setError('');
    try {
      if (editing) await onUpdate(editing.id, formData); else await onCreate(formData);
      setShowForm(false); load();
    } catch (err: any) { setError(err.response?.data?.error || 'Erro ao salvar'); }
    finally { setSaving(false); }
  };

  const handleDelete = async (item: T) => {
    if (!confirm('Excluir?')) return;
    try { await onDelete(item.id); load(); } catch (err: any) { alert(err.response?.data?.error || 'Erro'); }
  };

  const inputCls = "w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500";

  return (
    <div className="container-app py-8">
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="font-display font-bold text-3xl text-gray-900">{title}</h1><p className="text-gray-500 mt-1">{subtitle}</p></div>
        <Button onClick={openCreate}><Plus className="h-4 w-4" /> Novo</Button>
      </div>
      {loading ? <div className="flex justify-center py-20"><Spinner size="lg" /></div> : (
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead><tr className="bg-gray-50 border-b border-gray-200">
              {columns.map(c => <th key={c.key} className="text-left px-4 py-3 font-medium text-gray-500">{c.label}</th>)}
              <th className="text-center px-4 py-3 font-medium text-gray-500">Acoes</th>
            </tr></thead>
            <tbody className="divide-y divide-gray-100">
              {items.map(item => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  {columns.map(c => <td key={c.key} className="px-4 py-3 text-gray-900">{item[c.key]}</td>)}
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center gap-1">
                      <button onClick={() => openEdit(item)} className="p-1.5 text-brand-600 hover:bg-brand-50 rounded-lg transition-colors"><Pencil className="h-4 w-4" /></button>
                      <button onClick={() => handleDelete(item)} className="p-1.5 text-red-400 hover:bg-red-50 rounded-lg transition-colors"><Trash2 className="h-4 w-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {items.length === 0 && <div className="text-center py-12 text-gray-400"><p>Nenhum item cadastrado</p></div>}
        </div>
      )}
      <Modal open={showForm} onClose={() => setShowForm(false)} title={editing ? 'Editar' : 'Novo'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          {fields.map(f => (
            <div key={f.key}><label className="block text-xs font-medium text-gray-500 mb-1.5">{f.label}</label>
              <input type="text" value={formData[f.key] || ''} onChange={e => setFormData(prev => ({ ...prev, [f.key]: e.target.value }))} required placeholder={f.placeholder} className={inputCls} />
            </div>
          ))}
          {error && <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-xl">{error}</p>}
          <div className="flex gap-2 pt-2">
            <Button type="button" variant="secondary" onClick={() => setShowForm(false)} className="flex-1">Cancelar</Button>
            <Button type="submit" disabled={saving} className="flex-1">{saving ? 'Salvando...' : editing ? 'Salvar' : 'Criar'}</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}