import { LoadingState, ErrorState, EmptyState } from "../common";
import type { ProdutoPerecivel } from "../../types";

type Props = {
  produtos: ProdutoPerecivel[];
  loading: boolean;
  error: string | null;
};

export function PerecivelTab({ produtos, loading, error }: Props) {

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error} />;

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white shadow-sm">
      {produtos.length === 0 ? (
        <EmptyState message="Nenhum perecível cadastrado." />
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-xs font-medium uppercase tracking-wider text-slate-400">
                <th className="px-6 py-3">ID</th>
                <th className="px-6 py-3">Nome</th>
                <th className="px-6 py-3">Preço</th>
                <th className="px-6 py-3">Estoque</th>
                <th className="px-6 py-3">Validade</th>
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
                    <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700">
                      {p.estoque}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-600">{p.dataValidade}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
