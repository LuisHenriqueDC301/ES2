import { useState } from "react";
import { usePedidos } from "../../hooks/usePedidos";
import { useProdutos } from "../../hooks/useProdutos";
import { PedidoCard, NovoPedidoModal } from "../../components/Pedidos";
import { LoadingState, ErrorState, EmptyState } from "../../components/common";
import type { AdicionarItemPayload } from "../../types";

export function PedidosPage() {
  const { pedidos, loading, error, cadastrar, adicionarItem } = usePedidos();
  const { produtos } = useProdutos();
  const [modalAberto, setModalAberto] = useState(false);
  const [expandido, setExpandido] = useState<number | null>(null);

  const handleCriarPedido = async (itens: AdicionarItemPayload[]) => {
    const novo = await cadastrar();
    for (const item of itens) {
      await adicionarItem(novo.id, item);
    }
  };

  const handleAdicionarItem = async (
    pedidoId: number,
    dados: AdicionarItemPayload,
  ) => {
    await adicionarItem(pedidoId, dados);
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Pedidos
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Crie e acompanhe seus pedidos.
          </p>
        </div>
        <button
          onClick={() => setModalAberto(true)}
          className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 transition-colors"
        >
          + Novo Pedido
        </button>
      </div>

      <NovoPedidoModal
        open={modalAberto}
        onClose={() => setModalAberto(false)}
        produtos={produtos}
        onConfirm={handleCriarPedido}
      />

      {loading && <LoadingState />}
      {error && <ErrorState message={error} />}

      {!loading && !error && pedidos.length === 0 && (
        <EmptyState message="Nenhum pedido encontrado." />
      )}

      {!loading && !error && pedidos.length > 0 && (
        <div className="space-y-3">
          {pedidos.map((pedido) => (
            <PedidoCard
              key={pedido.id}
              pedido={pedido}
              expandido={expandido === pedido.id}
              onToggle={() =>
                setExpandido(expandido === pedido.id ? null : pedido.id)
              }
              produtos={produtos}
              onAdicionarItem={handleAdicionarItem}
            />
          ))}
        </div>
      )}
    </div>
  );
}
