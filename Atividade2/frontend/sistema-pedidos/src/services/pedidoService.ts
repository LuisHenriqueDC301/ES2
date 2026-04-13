// src/services/pedidoService.ts

import { ENDPOINTS } from "../endpoints";
import type { Pedido, AdicionarItemPayload } from "../types";

export const pedidoService = {
  listar: async (): Promise<Pedido[]> => {
    const res = await fetch(ENDPOINTS.pedidos.listar);
    return res.json();
  },

  buscarPorId: async (id: number): Promise<Pedido> => {
    const res = await fetch(ENDPOINTS.pedidos.buscarPorId(id));
    return res.json();
  },

  cadastrar: async (): Promise<Pedido> => {
    const res = await fetch(ENDPOINTS.pedidos.cadastrar, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    });
    return res.json();
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
    return res.json();
  },
};
