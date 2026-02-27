import { clsx } from 'clsx';
interface SpinnerProps { size?: 'sm' | 'md' | 'lg'; className?: string; }
export function Spinner({ size = 'md', className }: SpinnerProps) {
  const s = { sm: 'h-4 w-4', md: 'h-8 w-8', lg: 'h-12 w-12' };
  return <div className={clsx('animate-spin rounded-full border-2 border-gray-200 border-t-brand-600', s[size], className)} />;
}
