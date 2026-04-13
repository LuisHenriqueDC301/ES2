import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import { ROUTES } from "./constants/RoutesPath";
import { HomePage } from "./pages/Home";
import { ProdutosPage } from "./pages/Produtos";
import { PedidosPage } from "./pages/Pedidos";

export function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/40">
        <header className="sticky top-0 z-50 border-b border-slate-200/60 bg-white/80 backdrop-blur-lg">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
            <NavLink
              to={ROUTES.home}
              className="flex items-center gap-2.5 group"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 shadow-sm shadow-blue-200 group-hover:shadow-md group-hover:shadow-blue-200 transition-shadow">
                <svg
                  className="h-5 w-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.8}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"
                  />
                </svg>
              </div>
              <span className="text-lg font-bold tracking-tight text-slate-800">
                Pedidos<span className="text-blue-600">.</span>
              </span>
            </NavLink>

            <nav className="flex items-center gap-1">
              <NavLink
                to={ROUTES.home}
                end
                className={({ isActive }) =>
                  `rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-blue-50 text-blue-700"
                      : "text-slate-500 hover:bg-slate-100 hover:text-slate-700"
                  }`
                }
              >
                Home
              </NavLink>
              <NavLink
                to={ROUTES.produtos}
                className={({ isActive }) =>
                  `rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-blue-50 text-blue-700"
                      : "text-slate-500 hover:bg-slate-100 hover:text-slate-700"
                  }`
                }
              >
                Produtos
              </NavLink>
              <NavLink
                to={ROUTES.pedidos}
                className={({ isActive }) =>
                  `rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-blue-50 text-blue-700"
                      : "text-slate-500 hover:bg-slate-100 hover:text-slate-700"
                  }`
                }
              >
                Pedidos
              </NavLink>
            </nav>
          </div>
        </header>

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
