import { useState, useEffect, useCallback } from 'react';
import { Plus, Trash2, Package, Pencil } from 'lucide-react';
import { searchProducts, deleteProduct, updateProduct } from '@/services/cellstore.service';
import type { ProductWithRelations, PaginationMeta } from '@cellstore/shared';
import { Button, Badge, Spinner, Modal } from '@/components/ui';
import { Pagination } from '@/components/tables';
import { MovementForm, ProductForm } from '@/components/forms';

export function EstoquePage() {
  const [products, setProducts] = useState<ProductWithRelations[]>([]);
  const [meta, setMeta] = useState<PaginationMeta>({ page: 1, limit: 20, total: 0, totalPages: 0 });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showCreate, setShowCreate] = useState(false);
  const [movTarget, setMovTarget] = useState<ProductWithRelations | null>(null);
  const [editTarget, setEditTarget] = useState<ProductWithRelations | null>(null);
  const [editName, setEditName] = useState('');
  const [editPrice, setEditPrice] = useState('');
  const [editSaving, setEditSaving] = useState(false);
  const [editError, setEditError] = useState('');

  const loadData = useCallback(async (page = 1) => {
    setLoading(true);
    try {
      const r = await searchProducts({ page, limit: 20, search: search || undefined });
      setProducts(r.products || []); setMeta(r.meta || { page: 1, limit: 20, total: 0, totalPages: 0 });
    } finally { setLoading(false); }
  }, [search]);

  useEffect(() => { loadData(); }, [loadData]);

  const handleDelete = async (p: ProductWithRelations) => {
    if (!confirm('Excluir ' + p.name + '?')) return;
    try { await deleteProduct(p.id); loadData(meta.page); } catch (err: any) { alert(err.response?.data?.error || 'Erro'); }
  };

  const openEdit = (p: ProductWithRelations) => { setEditTarget(p); setEditName(p.name); setEditPrice(String(p.price)); setEditError(''); };

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault(); if (!editTarget) return;
    setEditSaving(true); setEditError('');
    try { await updateProduct(editTarget.id, { name: editName, price: Number(editPrice) }); setEditTarget(null); loadData(meta.page); }
    catch (err: any) { setEditError(err.response?.data?.error || 'Erro'); }
    finally { setEditSaving(false); }
  };

  const inputCls = "w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500";

  return (
    <div className="container-app py-8">
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="font-display font-bold text-3xl text-gray-900">Controle de Estoque</h1><p className="text-gray-500 mt-1">Produtos, precos e quantidades</p></div>
        <Button onClick={() => setShowCreate(true)}><Plus className="h-4 w-4" /> Novo Produto</Button>
      </div>

      <div className="mb-4">
        <input type="text" value={search} onChange={e => setSearch(e.target.value)} onKeyDown={e => e.key === 'Enter' && loadData()}
          placeholder="Buscar por nome, modelo, marca, tipo..." className={inputCls + " max-w-md"} />
      </div>

      {loading ? <div className="flex justify-center py-20"><Spinner size="lg" /></div> : (
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left px-4 py-3 font-medium text-gray-500">Produto</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500">Tipo</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500">Modelo</th>
                <th className="text-center px-4 py-3 font-medium text-gray-500">Gancho</th>
                <th className="text-right px-4 py-3 font-medium text-gray-500">Preco</th>
                <th className="text-center px-4 py-3 font-medium text-gray-500">Estoque</th>
                <th className="text-center px-4 py-3 font-medium text-gray-500">Status</th>
                <th className="text-center px-4 py-3 font-medium text-gray-500">Acoes</th>
              </tr></thead>
              <tbody className="divide-y divide-gray-100">
                {products.map(p => (
                  <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 font-medium text-gray-900">{p.name}</td>
                    <td className="px-4 py-3 text-gray-600">{p.category.name}</td>
                    <td className="px-4 py-3 text-gray-600">{p.phoneModel.brand} {p.phoneModel.name}</td>
                    <td className="px-4 py-3 text-center"><Badge>{p.slot.label}</Badge></td>
                    <td className="px-4 py-3 text-right font-medium">R$ {p.price.toFixed(2).replace('.', ',')}</td>
                    <td className="px-4 py-3 text-center">
                      <span className={`font-bold ${p.stock > 10 ? 'text-emerald-600' : p.stock > 0 ? 'text-amber-600' : 'text-red-600'}`}>{p.stock}</span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <Badge variant={p.isActive && p.stock > 0 ? 'success' : p.stock === 0 ? 'danger' : 'warning'}>
                        {p.isActive && p.stock > 0 ? 'Disponivel' : p.stock === 0 ? 'Sem estoque' : 'Inativo'}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-center gap-1">
                        <button onClick={() => setMovTarget(p)} title="Entrada/Saida" className="p-1.5 text-brand-600 hover:bg-brand-50 rounded-lg transition-colors"><Package className="h-4 w-4" /></button>
                        <button onClick={() => openEdit(p)} title="Editar" className="p-1.5 text-amber-500 hover:bg-amber-50 rounded-lg transition-colors"><Pencil className="h-4 w-4" /></button>
                        <button onClick={() => handleDelete(p)} title="Excluir" className="p-1.5 text-red-400 hover:bg-red-50 rounded-lg transition-colors"><Trash2 className="h-4 w-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {products.length === 0 && <div className="text-center py-12 text-gray-400"><Package className="h-12 w-12 mx-auto mb-3" /><p>Nenhum produto encontrado</p></div>}
        </div>
      )}

      <Pagination meta={meta} onPrev={() => loadData(meta.page - 1)} onNext={() => loadData(meta.page + 1)} />

      <Modal open={showCreate} onClose={() => setShowCreate(false)} title="Novo Produto">
        <ProductForm onSuccess={() => { setShowCreate(false); loadData(); }} onCancel={() => setShowCreate(false)} />
      </Modal>

      <Modal open={!!movTarget} onClose={() => setMovTarget(null)} title="Movimentacao de Estoque">
        {movTarget && <MovementForm productId={movTarget.id} productName={movTarget.name} currentStock={movTarget.stock} onSuccess={() => { setMovTarget(null); loadData(meta.page); }} onCancel={() => setMovTarget(null)} />}
      </Modal>

      <Modal open={!!editTarget} onClose={() => setEditTarget(null)} title="Editar Produto">
        <form onSubmit={handleEdit} className="space-y-4">
          <div><label className="block text-xs font-medium text-gray-500 mb-1.5">Nome</label><input type="text" value={editName} onChange={e => setEditName(e.target.value)} required className={inputCls} /></div>
          <div><label className="block text-xs font-medium text-gray-500 mb-1.5">Preco (R$)</label><input type="number" value={editPrice} onChange={e => setEditPrice(e.target.value)} required min="0.01" step="0.01" className={inputCls} /></div>
          {editError && <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-xl">{editError}</p>}
          <div className="flex gap-2 pt-2">
            <Button type="button" variant="secondary" onClick={() => setEditTarget(null)} className="flex-1">Cancelar</Button>
            <Button type="submit" disabled={editSaving} className="flex-1">{editSaving ? 'Salvando...' : 'Salvar'}</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}