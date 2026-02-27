import { useState, useEffect } from 'react';
import { Button } from '@/components/ui';
import { getCategories, getPhoneModels, getSlots, createProduct } from '@/services/cellstore.service';
import type { Category, PhoneModel, Slot } from '@cellstore/shared';

interface Props { onSuccess: () => void; onCancel: () => void; }

export function ProductForm({ onSuccess, onCancel }: Props) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [phoneModels, setPhoneModels] = useState<PhoneModel[]>([]);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [categoryId, setCategoryId] = useState('');
  const [phoneModelId, setPhoneModelId] = useState('');
  const [slotId, setSlotId] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('0');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => { getCategories().then(setCategories); getPhoneModels().then(setPhoneModels); getSlots().then(setSlots); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true); setError('');
    try { await createProduct({ categoryId, phoneModelId, slotId, name, price: Number(price), stock: Number(stock) }); onSuccess(); }
    catch (err: any) { setError(err.response?.data?.error || 'Erro ao criar'); }
    finally { setLoading(false); }
  };

  const brands = [...new Set(phoneModels.map(p => p.brand))];
  const inputCls = "w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div><label className="block text-xs font-medium text-gray-500 mb-1.5">Tipo (Categoria)</label>
        <select value={categoryId} onChange={e => setCategoryId(e.target.value)} required className={inputCls}>
          <option value="">Selecione...</option>{categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
      </div>
      <div><label className="block text-xs font-medium text-gray-500 mb-1.5">Modelo do Celular</label>
        <select value={phoneModelId} onChange={e => setPhoneModelId(e.target.value)} required className={inputCls}>
          <option value="">Selecione...</option>{brands.map(b => <optgroup key={b} label={b}>{phoneModels.filter(p => p.brand === b).map(p => <option key={p.id} value={p.id}>{p.name}</option>)}</optgroup>)}
        </select>
      </div>
      <div><label className="block text-xs font-medium text-gray-500 mb-1.5">Gancho (Posicao)</label>
        <select value={slotId} onChange={e => setSlotId(e.target.value)} required className={inputCls}>
          <option value="">Selecione...</option>{slots.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
        </select>
      </div>
      <div><label className="block text-xs font-medium text-gray-500 mb-1.5">Nome do Produto</label>
        <input type="text" value={name} onChange={e => setName(e.target.value)} required placeholder="Ex: Capinha Silicone iPhone 15" className={inputCls} />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div><label className="block text-xs font-medium text-gray-500 mb-1.5">Preco (R$)</label><input type="number" value={price} onChange={e => setPrice(e.target.value)} required min="0.01" step="0.01" className={inputCls} /></div>
        <div><label className="block text-xs font-medium text-gray-500 mb-1.5">Estoque Inicial</label><input type="number" value={stock} onChange={e => setStock(e.target.value)} required min="0" className={inputCls} /></div>
      </div>
      {error && <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-xl">{error}</p>}
      <div className="flex gap-2 pt-2">
        <Button type="button" variant="secondary" onClick={onCancel} className="flex-1">Cancelar</Button>
        <Button type="submit" disabled={loading} className="flex-1">{loading ? 'Criando...' : 'Criar Produto'}</Button>
      </div>
    </form>
  );
}