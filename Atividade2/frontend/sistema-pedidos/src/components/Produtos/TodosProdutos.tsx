import { useState } from "react";
import { LoadingState, ErrorState, EmptyState, Toast } from "../common";
import { EditarProdutoModal } from "./EditarProdutoModal";
import { ConfirmarExclusaoModal } from "./ConfirmarExclusaoModal";
import type { Produto } from "../../types";

type Props = {
  produtos: Produto[];
  loading: boolean;
  error: string | null;
  alterar: (id: number, dados: Partial<Produto>) => Promise<void>;
  excluir: (id: number) => Promise<void>;
};

export function TodosProdutos({ produtos, loading, error, alterar, excluir }: Props) {
  const [editando, setEditando] = useState<Produto | null>(null);
  const [excluindo, setExcluindo] = useState<Produto | null>(null);
  const [toastErro, setToastErro] = useState<string | null>(null);

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error} />;

  return (
    <>
      <div className="rounded-2xl border border-slate-200/80 bg-white shadow-sm">
        {produtos.length === 0 ? (
          <EmptyState message="Nenhum produto cadastrado." />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-100 text-xs font-medium uppercase tracking-wider text-slate-400">
                  <th className="px-6 py-3">ID</th>
                  <th className="px-6 py-3">Nome</th>
                  <th className="px-6 py-3">Preço</th>
                  <th className="px-6 py-3">Estoque</th>
                  <th className="px-6 py-3 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {produtos.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/50">
                    <td className="px-6 py-4 font-mono text-xs text-slate-400">
                      #{p.id}
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-700">
                      {p.nome}
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      R$ {p.preco.toFixed(2)}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          p.estoque > 0
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-red-50 text-red-700"
                        }`}
                      >
                        {p.estoque}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => setEditando(p)}
                        className="rounded-lg px-3 py-1.5 text-xs font-medium text-blue-600 hover:bg-blue-50 transition-colors"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => setExcluindo(p)}
                        className="rounded-lg px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 transition-colors ml-1"
                      >
                        Excluir
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {editando && (
        <EditarProdutoModal
          open={!!editando}
          onClose={() => setEditando(null)}
          produto={editando}
          onSalvar={alterar}
        />
      )}

      {excluindo && (
        <ConfirmarExclusaoModal
          open={!!excluindo}
          onClose={() => setExcluindo(null)}
          produtoNome={excluindo.nome}
          onConfirm={() => excluir(excluindo.id)}
          onErro={setToastErro}
        />
      )}

      {toastErro && <Toast message={toastErro} onClose={() => setToastErro(null)} />}
    </>
  );
}
