import { useState } from 'react';
import { Button } from '@/components/ui';
import { createMovement } from '@/services/cellstore.service';

interface Props { productId: string; productName: string; currentStock: number; onSuccess: () => void; onCancel: () => void; }

export function MovementForm({ productId, productName, currentStock, onSuccess, onCancel }: Props) {
  const [type, setType] = useState<'ENTRY' | 'EXIT'>('ENTRY');
  const [quantity, setQuantity] = useState('');
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const qty = Number(quantity);
    if (qty <= 0) { setError('Quantidade deve ser positiva'); return; }
    if (type === 'EXIT' && qty > currentStock) { setError('Estoque insuficiente. Disponivel: ' + currentStock); return; }
    setLoading(true); setError('');
    try { await createMovement({ productId, type, quantity: qty, reason: reason || undefined }); onSuccess(); }
    catch (err: any) { setError(err.response?.data?.error || 'Erro ao registrar'); }
    finally { setLoading(false); }
  };

  const inputCls = "w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="bg-gray-50 rounded-xl p-3 text-sm">
        <span className="text-gray-500">Produto:</span> <span className="font-medium">{productName}</span>
        <span className="ml-4 text-gray-500">Estoque:</span> <span className="font-bold">{currentStock}</span>
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-500 mb-1.5">Tipo</label>
        <div className="flex gap-2">
          <button type="button" onClick={() => setType('ENTRY')} className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${type === 'ENTRY' ? 'bg-emerald-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>Entrada</button>
          <button type="button" onClick={() => setType('EXIT')} className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${type === 'EXIT' ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>Saida</button>
        </div>
      </div>
      <div><label className="block text-xs font-medium text-gray-500 mb-1.5">Quantidade</label><input type="number" value={quantity} onChange={e => setQuantity(e.target.value)} min="1" required className={inputCls} /></div>
      <div><label className="block text-xs font-medium text-gray-500 mb-1.5">Motivo (opcional)</label><input type="text" value={reason} onChange={e => setReason(e.target.value)} placeholder="Ex: Venda, Reposicao..." className={inputCls} /></div>
      {error && <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-xl">{error}</p>}
      <div className="flex gap-2 pt-2">
        <Button type="button" variant="secondary" onClick={onCancel} className="flex-1">Cancelar</Button>
        <Button type="submit" disabled={loading} className="flex-1">{loading ? 'Salvando...' : 'Registrar'}</Button>
      </div>
    </form>
  );
}