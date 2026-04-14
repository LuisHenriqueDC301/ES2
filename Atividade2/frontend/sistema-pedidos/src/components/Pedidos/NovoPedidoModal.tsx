import { useState } from "react";
import { Modal } from "../common/Modal";
import type { AdicionarItemPayload } from "../../types";

interface ItemRascunho {
  produtoId: number;
  produtoNome: string;
  qtde: number;
}

export function NovoPedidoModal({
  open,
  onClose,
  produtos,
  onConfirm,
}: {
  open: boolean;
  onClose: () => void;
  produtos: { id: number; nome: string }[];
  onConfirm: (itens: AdicionarItemPayload[]) => Promise<void>;
}) {
  const [itens, setItens] = useState<ItemRascunho[]>([]);
  const [salvando, setSalvando] = useState(false);

  const handleAddItem = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const produtoId = Number(fd.get("produtoId"));
    const qtde = Number(fd.get("qtde"));
    const produto = produtos.find((p) => p.id === produtoId);
    if (!produto) return;

    setItens((prev) => [
      ...prev,
      { produtoId, produtoNome: produto.nome, qtde },
    ]);
    e.currentTarget.reset();
  };

  const handleRemoveItem = (index: number) => {
    setItens((prev) => prev.filter((_, i) => i !== index));
  };

  const handleConfirm = async () => {
    setSalvando(true);
    try {
      await onConfirm(
        itens.map(({ produtoId, qtde }) => ({ produtoId, qtde })),
      );
      setItens([]);
      onClose();
    } finally {
      setSalvando(false);
    }
  };

  const handleClose = () => {
    setItens([]);
    onClose();
  };

  return (
    <Modal open={open} onClose={handleClose} title="Novo Pedido">
      <div className="space-y-5">
        <form
          onSubmit={handleAddItem}
          className="flex flex-wrap items-end gap-3"
        >
          <label className="flex flex-1 flex-col gap-1.5 min-w-[160px]">
            <span className="text-xs font-medium text-slate-500">Produto</span>
            <select
              name="produtoId"
              required
              className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-800 outline-none focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
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
              className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-800 outline-none focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
            />
          </label>
          <button
            type="submit"
            className="rounded-xl bg-slate-700 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 transition-colors"
          >
            + Item
          </button>
        </form>

        {itens.length > 0 && (
          <div className="rounded-xl border border-slate-200/80 bg-slate-50">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200/60 text-xs font-medium uppercase tracking-wider text-slate-400">
                  <th className="px-4 py-2.5">Produto</th>
                  <th className="px-4 py-2.5">Qtde</th>
                  <th className="px-4 py-2.5 text-right">Ação</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200/40">
                {itens.map((item, i) => (
                  <tr key={i}>
                    <td className="px-4 py-2.5 font-medium text-slate-700">
                      {item.produtoNome}
                    </td>
                    <td className="px-4 py-2.5 text-slate-500">{item.qtde}</td>
                    <td className="px-4 py-2.5 text-right">
                      <button
                        onClick={() => handleRemoveItem(i)}
                        className="text-xs font-medium text-red-500 hover:text-red-700 transition-colors"
                      >
                        Remover
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="flex items-center justify-between border-t border-slate-100 pt-4">
          <span className="text-sm text-slate-400">
            {itens.length} {itens.length === 1 ? "item" : "itens"}
          </span>
          <div className="flex gap-2">
            <button
              onClick={handleClose}
              className="rounded-xl px-4 py-2 text-sm font-medium text-slate-500 hover:bg-slate-100 transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={handleConfirm}
              disabled={salvando}
              className="rounded-xl bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              {salvando ? "Criando..." : "Criar Pedido"}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
