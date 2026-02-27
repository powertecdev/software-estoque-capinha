import { clsx } from 'clsx';
interface BadgeProps { children: React.ReactNode; variant?: 'default' | 'success' | 'warning' | 'danger'; className?: string; }
export function Badge({ children, variant = 'default', className }: BadgeProps) {
  const v = { default: 'bg-gray-100 text-gray-700', success: 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200', warning: 'bg-amber-50 text-amber-700 ring-1 ring-amber-200', danger: 'bg-red-50 text-red-700 ring-1 ring-red-200' };
  return <span className={clsx('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium', v[variant], className)}>{children}</span>;
}
