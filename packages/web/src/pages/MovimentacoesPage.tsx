import { useState, useEffect, useCallback } from 'react';
import { ArrowUpCircle, ArrowDownCircle, History } from 'lucide-react';
import { getMovements } from '@/services/cellstore.service';
import type { MovementWithProduct, PaginationMeta } from '@cellstore/shared';
import { Spinner, Badge } from '@/components/ui';
import { Pagination } from '@/components/tables';

export function MovimentacoesPage() {
  const [movements, setMovements] = useState<MovementWithProduct[]>([]);
  const [meta, setMeta] = useState<PaginationMeta>({ page: 1, limit: 20, total: 0, totalPages: 0 });
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(async (page = 1) => {
    setLoading(true);
    try { const r = await getMovements(page, 20); setMovements(r.movements); setMeta(r.meta); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

  const fmt = (d: string | Date) => new Date(d).toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });

  return (
    <div className="container-app py-8">
      <div className="mb-6"><h1 className="font-display font-bold text-3xl text-gray-900">Historico de Movimentacoes</h1><p className="text-gray-500 mt-1">Entradas e saidas de estoque</p></div>
      {loading ? <div className="flex justify-center py-20"><Spinner size="lg" /></div> : (
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left px-4 py-3 font-medium text-gray-500">Data</th>
                <th className="text-center px-4 py-3 font-medium text-gray-500">Tipo</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500">Produto</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500">Modelo</th>
                <th className="text-center px-4 py-3 font-medium text-gray-500">Gancho</th>
                <th className="text-center px-4 py-3 font-medium text-gray-500">Qtd</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500">Motivo</th>
              </tr></thead>
              <tbody className="divide-y divide-gray-100">
                {movements.map(m => (
                  <tr key={m.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 text-xs text-gray-500">{fmt(m.createdAt)}</td>
                    <td className="px-4 py-3 text-center">
                      {m.type === 'ENTRY' ? <Badge variant="success"><ArrowUpCircle className="h-3 w-3 inline mr-1" />Entrada</Badge> : <Badge variant="danger"><ArrowDownCircle className="h-3 w-3 inline mr-1" />Saida</Badge>}
                    </td>
                    <td className="px-4 py-3 text-gray-900">{m.product.name}</td>
                    <td className="px-4 py-3 text-gray-600">{m.product.phoneModel.brand} {m.product.phoneModel.name}</td>
                    <td className="px-4 py-3 text-center"><Badge>{m.product.slot.label}</Badge></td>
                    <td className="px-4 py-3 text-center font-bold"><span className={m.type === 'ENTRY' ? 'text-emerald-600' : 'text-red-600'}>{m.type === 'ENTRY' ? '+' : '-'}{m.quantity}</span></td>
                    <td className="px-4 py-3 text-gray-500 text-xs">{m.reason || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {movements.length === 0 && <div className="text-center py-12 text-gray-400"><History className="h-12 w-12 mx-auto mb-3" /><p>Nenhuma movimentacao</p></div>}
        </div>
      )}
      <Pagination meta={meta} onPrev={() => loadData(meta.page - 1)} onNext={() => loadData(meta.page + 1)} />
    </div>
  );
}