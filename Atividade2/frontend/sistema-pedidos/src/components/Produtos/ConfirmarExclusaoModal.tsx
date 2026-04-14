import { useState } from "react";
import { Modal } from "../common/Modal";

export function ConfirmarExclusaoModal({
  open,
  onClose,
  produtoNome,
  onConfirm,
}: {
  open: boolean;
  onClose: () => void;
  produtoNome: string;
  onConfirm: () => Promise<void>;
}) {
  const [excluindo, setExcluindo] = useState(false);

  const handleConfirm = async () => {
    setExcluindo(true);
    try {
      await onConfirm();
      onClose();
    } finally {
      setExcluindo(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose} title="Excluir Produto">
      <div className="space-y-5">
        <p className="text-sm text-slate-600">
          Tem certeza que deseja excluir{" "}
          <span className="font-semibold text-slate-800">{produtoNome}</span>?
          Essa ação não pode ser desfeita.
        </p>
        <div className="flex justify-end gap-2 border-t border-slate-100 pt-4">
          <button
            onClick={onClose}
            className="rounded-xl px-4 py-2 text-sm font-medium text-slate-500 hover:bg-slate-100 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirm}
            disabled={excluindo}
            className="rounded-xl bg-red-600 px-5 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50 transition-colors"
          >
            {excluindo ? "Excluindo..." : "Excluir"}
          </button>
        </div>
      </div>
    </Modal>
  );
}
