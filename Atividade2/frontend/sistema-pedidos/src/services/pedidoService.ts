import { ENDPOINTS } from "../constants/endpoints";
import type { Pedido, AdicionarItemPayload } from "../types";

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`HTTP ${res.status}: ${text || res.statusText}`);
  }
  return res.json();
}

export const pedidoService = {
  listar: async (): Promise<Pedido[]> => {
    const res = await fetch(ENDPOINTS.pedidos.listar);
    return handleResponse(res);
  },

  buscarPorId: async (id: number): Promise<Pedido> => {
    const res = await fetch(ENDPOINTS.pedidos.buscarPorId(id));
    return handleResponse(res);
  },

  cadastrar: async (): Promise<Pedido> => {
    const res = await fetch(ENDPOINTS.pedidos.cadastrar, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    });
    return handleResponse(res);
  },

  adicionarItem: async (
    pedidoId: number,
    dados: AdicionarItemPayload,
  ): Promise<Pedido> => {
    const res = await fetch(ENDPOINTS.pedidos.adicionarItem(pedidoId), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dados),
    });
    return handleResponse(res);
  },
};
