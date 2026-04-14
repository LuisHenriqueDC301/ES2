import { useState } from "react";
import type { AdicionarItemPayload, Pedido } from "../../types";

export function PedidoCard({
  pedido,
  expandido,
  onToggle,
  produtos,
  onAdicionarItem,
}: {
  pedido: Pedido;
  expandido: boolean;
  onToggle: () => void;
  produtos: { id: number; nome: string }[];
  onAdicionarItem: (
    pedidoId: number,
    dados: AdicionarItemPayload,
  ) => Promise<void>;
}) {
  const [adicionando, setAdicionando] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setAdicionando(true);
    try {
      await onAdicionarItem(pedido.id, {
        produtoId: Number(fd.get("produtoId")),
        qtde: Number(fd.get("qtde")),
      });
      e.currentTarget.reset();
    } finally {
      setAdicionando(false);
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white shadow-sm">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between px-6 py-4 text-left"
      >
        <div className="flex items-center gap-4">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-sm font-bold text-blue-600">
            #{pedido.id}
          </span>
          <div>
            <p className="text-sm font-medium text-slate-800">
              Pedido #{pedido.id}
            </p>
            <p className="text-xs text-slate-400">
              {pedido.data} · {pedido.itens.length} ite
              {pedido.itens.length === 1 ? "m" : "ns"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm font-semibold text-slate-700">
            R$ {pedido.valorTotal.toFixed(2)}
          </span>
          <svg
            className={`h-5 w-5 text-slate-400 transition-transform ${expandido ? "rotate-180" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m19.5 8.25-7.5 7.5-7.5-7.5"
            />
          </svg>
        </div>
      </button>

      {expandido && (
        <div className="border-t border-slate-100 px-6 py-4">
          {pedido.itens.length > 0 && (
            <table className="mb-4 w-full text-left text-sm">
              <thead>
                <tr className="text-xs font-medium uppercase tracking-wider text-slate-400">
                  <th className="pb-2">Produto</th>
                  <th className="pb-2">Qtde</th>
                  <th className="pb-2 text-right">Valor</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {pedido.itens.map((item) => (
                  <tr key={item.codigoItem}>
                    <td className="py-2 font-medium text-slate-700">
                      {item.produto.nome}
                    </td>
                    <td className="py-2 text-slate-500">{item.qtde}</td>
                    <td className="py-2 text-right text-slate-600">
                      R$ {item.valorItem.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          <form
            onSubmit={handleSubmit}
            className="flex flex-wrap items-end gap-3 rounded-xl bg-slate-50 p-4"
          >
            <label className="flex flex-1 flex-col gap-1.5 min-w-[160px]">
              <span className="text-xs font-medium text-slate-500">
                Produto
              </span>
              <select
                name="produtoId"
                required
                className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
              >
                <option value="">Selecione...</option>
                {produtos.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.nome}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex w-24 flex-col gap-1.5">
              <span className="text-xs font-medium text-slate-500">Qtde</span>
              <input
                name="qtde"
                type="number"
                min={1}
                defaultValue={1}
                required
                className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
              />
            </label>
            <button
              type="submit"
              disabled={adicionando}
              className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-50 transition-colors"
            >
              {adicionando ? "Adicionando..." : "Adicionar"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
