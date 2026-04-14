import { useState } from "react";
import { Modal } from "../common/Modal";
import { Input } from "../common";
import type {
  CadastrarEletronicoPayload,
  CadastrarPerecivelPayload,
} from "../../types";

type TipoProduto = "eletronico" | "perecivel";

export function NovoProdutoModal({
  open,
  onClose,
  onCadastrarEletronico,
  onCadastrarPerecivel,
}: {
  open: boolean;
  onClose: () => void;
  onCadastrarEletronico: (dados: CadastrarEletronicoPayload) => Promise<void>;
  onCadastrarPerecivel: (dados: CadastrarPerecivelPayload) => Promise<void>;
}) {
  const [tipo, setTipo] = useState<TipoProduto>("eletronico");
  const [salvando, setSalvando] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setSalvando(true);
    try {
      const base = {
        nome: fd.get("nome") as string,
        preco: Number(fd.get("preco")),
        estoque: Number(fd.get("estoque")),
      };

      if (tipo === "eletronico") {
        await onCadastrarEletronico({
          ...base,
          voltagem: Number(fd.get("voltagem")),
        });
      } else {
        await onCadastrarPerecivel({
          ...base,
          dataValidade: fd.get("dataValidade") as string,
        });
      }
      onClose();
    } finally {
      setSalvando(false);
    }
  };

  const handleClose = () => {
    setTipo("eletronico");
    onClose();
  };

  return (
    <Modal open={open} onClose={handleClose} title="Novo Produto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-medium text-slate-500">
            Tipo de Produto
          </span>
          <select
            value={tipo}
            onChange={(e) => setTipo(e.target.value as TipoProduto)}
            className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-800 outline-none focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
          >
            <option value="eletronico">Eletrônico</option>
            <option value="perecivel">Perecível</option>
          </select>
        </label>

        <div className="grid grid-cols-2 gap-4">
          <Input label="Nome" name="nome" />
          <Input label="Preço" name="preco" type="number" step="0.01" />
          <Input label="Estoque" name="estoque" type="number" />

          {tipo === "eletronico" ? (
            <Input label="Voltagem" name="voltagem" type="number" />
          ) : (
            <Input label="Data de Validade" name="dataValidade" type="date" />
          )}
        </div>

        <div className="flex justify-end gap-2 border-t border-slate-100 pt-4">
          <button
            type="button"
            onClick={handleClose}
            className="rounded-xl px-4 py-2 text-sm font-medium text-slate-500 hover:bg-slate-100 transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={salvando}
            className="rounded-xl bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            {salvando ? "Cadastrando..." : "Cadastrar"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
