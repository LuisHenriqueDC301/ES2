import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ROUTES } from "./constants/RoutesPath";
import { Header } from "./components/common";
import { HomePage } from "./pages/Home";
import { ProdutosPage } from "./pages/Produtos";
import { PedidosPage } from "./pages/Pedidos";

export function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-linear-to-br from-slate-50 to-blue-50/40">
        <Header />
        <main className="mx-auto max-w-6xl px-6 py-8">
          <Routes>
            <Route path={ROUTES.home} element={<HomePage />} />
            <Route path={ROUTES.produtos} element={<ProdutosPage />} />
            <Route path={ROUTES.pedidos} element={<PedidosPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
