import { Smartphone } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { clsx } from 'clsx';

export function Header() {
  const { pathname } = useLocation();
  const nav = (to: string, label: string) => (
    <Link to={to} className={clsx('text-sm font-medium transition-colors', pathname === to ? 'text-brand-600' : 'text-gray-600 hover:text-brand-600')}>{label}</Link>
  );
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container-app flex items-center justify-between h-16">
        <Link to="/estoque" className="flex items-center gap-2.5 group">
          <div className="bg-brand-600 p-2 rounded-xl group-hover:bg-brand-700 transition-colors"><Smartphone className="h-5 w-5 text-white" /></div>
          <span className="font-display font-bold text-xl tracking-tight text-gray-900">Cell<span className="text-brand-600">Store</span></span>
        </Link>
        <nav className="flex items-center gap-5">
          {nav('/estoque', 'Estoque')}
          {nav('/movimentacoes', 'Movimentacoes')}
          {nav('/categorias', 'Categorias')}
          {nav('/modelos', 'Modelos')}
          {nav('/ganchos', 'Ganchos')}
        </nav>
      </div>
    </header>
  );
}