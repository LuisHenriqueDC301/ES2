import { useState } from "react";
import { Modal } from "../common/Modal";
import { Input } from "../common";
import type { Produto } from "../../types";

export function EditarProdutoModal({
  open,
  onClose,
  produto,
  onSalvar,
}: {
  open: boolean;
  onClose: () => void;
  produto: Produto;
  onSalvar: (id: number, dados: Partial<Produto>) => Promise<void>;
}) {
  const [salvando, setSalvando] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setSalvando(true);
    try {
      await onSalvar(produto.id, {
        nome: fd.get("nome") as string,
        preco: Number(fd.get("preco")),
        estoque: Number(fd.get("estoque")),
      });
      onClose();
    } finally {
      setSalvando(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose} title="Editar Produto">
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        <Input label="Nome" name="nome" defaultValue={produto.nome} />
        <Input
          label="Preço"
          name="preco"
          type="number"
          step="0.01"
          defaultValue={String(produto.preco)}
        />
        <Input
          label="Estoque"
          name="estoque"
          type="number"
          defaultValue={String(produto.estoque)}
        />
        <div className="col-span-2 flex justify-end gap-2 border-t border-slate-100 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl px-4 py-2 text-sm font-medium text-slate-500 hover:bg-slate-100 transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={salvando}
            className="rounded-xl bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            {salvando ? "Salvando..." : "Salvar"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
