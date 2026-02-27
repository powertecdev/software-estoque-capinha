import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { PaginationMeta } from '@cellstore/shared';
import { Button } from '@/components/ui';
interface Props { meta: PaginationMeta; onPrev: () => void; onNext: () => void; }
export function Pagination({ meta, onPrev, onNext }: Props) {
  if (meta.totalPages <= 1) return null;
  return (
    <div className="flex items-center justify-between pt-6">
      <p className="text-sm text-gray-500">Mostrando <span className="font-medium text-gray-700">{(meta.page - 1) * meta.limit + 1}</span> a <span className="font-medium text-gray-700">{Math.min(meta.page * meta.limit, meta.total)}</span> de <span className="font-medium text-gray-700">{meta.total}</span></p>
      <div className="flex gap-2">
        <Button variant="secondary" size="sm" onClick={onPrev} disabled={meta.page <= 1}><ChevronLeft className="h-4 w-4" /> Anterior</Button>
        <Button variant="secondary" size="sm" onClick={onNext} disabled={meta.page >= meta.totalPages}>Proximo <ChevronRight className="h-4 w-4" /></Button>
      </div>
    </div>
  );
}