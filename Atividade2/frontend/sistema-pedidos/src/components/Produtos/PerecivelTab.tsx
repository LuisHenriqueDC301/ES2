import { useState } from "react";
import { useProdutosPereciveis } from "../../hooks/useProdutos";
import { LoadingState, ErrorState, EmptyState, Input } from "../common";
import type { CadastrarPerecivelPayload } from "../../types";

export function PerecivelTab() {
  const { produtos, loading, error, cadastrar } = useProdutosPereciveis();
  const [showForm, setShowForm] = useState(false);

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error} />;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const dados: CadastrarPerecivelPayload = {
      nome: fd.get("nome") as string,
      preco: Number(fd.get("preco")),
      estoque: Number(fd.get("estoque")),
      dataValidade: fd.get("dataValidade") as string,
    };
    await cadastrar(dados);
    setShowForm(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <button
          onClick={() => setShowForm(!showForm)}
          className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 transition-colors"
        >
          {showForm ? "Cancelar" : "+ Novo Perecível"}
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-2 gap-4 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm"
        >
          <Input label="Nome" name="nome" />
          <Input label="Preço" name="preco" type="number" step="0.01" />
          <Input label="Estoque" name="estoque" type="number" />
          <Input label="Data de Validade" name="dataValidade" type="date" />
          <div className="col-span-2 flex justify-end">
            <button
              type="submit"
              className="rounded-xl bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
            >
              Cadastrar
            </button>
          </div>
        </form>
      )}

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
                    <td className="px-6 py-4 text-slate-600">
                      {p.dataValidade}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
