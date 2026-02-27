import { Routes, Route, Navigate } from 'react-router-dom';
import { Header, Footer } from '@/components/layout';
import { EstoquePage, MovimentacoesPage, CategoriasPage, ModelosPage, GanchosPage } from '@/pages';

export function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Navigate to="/estoque" replace />} />
          <Route path="/estoque" element={<EstoquePage />} />
          <Route path="/movimentacoes" element={<MovimentacoesPage />} />
          <Route path="/categorias" element={<CategoriasPage />} />
          <Route path="/modelos" element={<ModelosPage />} />
          <Route path="/ganchos" element={<GanchosPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}