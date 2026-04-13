// src/services/produtoService.ts

import { ENDPOINTS } from "../endpoints";
import type {
  Produto,
  ProdutoEletronico,
  ProdutoPerecivel,
  CadastrarEletronicoPayload,
  CadastrarPerecivelPayload,
} from "../types";

export const produtoService = {
  listar: async (): Promise<Produto[]> => {
    const res = await fetch(ENDPOINTS.produtos.listar);
    return res.json();
  },

  buscarPorId: async (id: number): Promise<Produto> => {
    const res = await fetch(ENDPOINTS.produtos.buscarPorId(id));
    return res.json();
  },

  alterar: async (id: number, dados: Partial<Produto>): Promise<Produto> => {
    const res = await fetch(ENDPOINTS.produtos.alterar(id), {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dados),
    });
    return res.json();
  },

  excluir: async (id: number): Promise<void> => {
    await fetch(ENDPOINTS.produtos.excluir(id), { method: "DELETE" });
  },

  eletronicos: {
    listar: async (): Promise<ProdutoEletronico[]> => {
      const res = await fetch(ENDPOINTS.produtos.eletronicos.listar);
      return res.json();
    },

    cadastrar: async (
      dados: CadastrarEletronicoPayload,
    ): Promise<ProdutoEletronico> => {
      const res = await fetch(ENDPOINTS.produtos.eletronicos.cadastrar, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados),
      });
      return res.json();
    },
  },

  pereciveis: {
    listar: async (): Promise<ProdutoPerecivel[]> => {
      const res = await fetch(ENDPOINTS.produtos.pereciveis.listar);
      return res.json();
    },

    cadastrar: async (
      dados: CadastrarPerecivelPayload,
    ): Promise<ProdutoPerecivel> => {
      const res = await fetch(ENDPOINTS.produtos.pereciveis.cadastrar, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados),
      });
      return res.json();
    },
  },
};
