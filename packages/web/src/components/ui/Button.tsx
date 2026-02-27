import { clsx } from 'clsx';
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> { variant?: 'primary' | 'secondary' | 'ghost'; size?: 'sm' | 'md' | 'lg'; }
export function Button({ children, variant = 'primary', size = 'md', className, disabled, ...props }: ButtonProps) {
  const base = 'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  const v = { primary: 'bg-brand-600 text-white hover:bg-brand-700 focus:ring-brand-500 shadow-sm', secondary: 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 focus:ring-brand-500', ghost: 'text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:ring-gray-300' };
  const s = { sm: 'text-sm px-3 py-1.5 gap-1.5', md: 'text-sm px-4 py-2.5 gap-2', lg: 'text-base px-6 py-3 gap-2' };
  return <button className={clsx(base, v[variant], s[size], className)} disabled={disabled} {...props}>{children}</button>;
}
