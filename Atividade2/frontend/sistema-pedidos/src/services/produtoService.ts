import { ENDPOINTS } from "../constants/endpoints";
import type {
  Produto,
  ProdutoEletronico,
  ProdutoPerecivel,
  CadastrarEletronicoPayload,
  CadastrarPerecivelPayload,
} from "../types";

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`HTTP ${res.status}: ${text || res.statusText}`);
  }
  return res.json();
}

export const produtoService = {
  listar: async (): Promise<Produto[]> => {
    const res = await fetch(ENDPOINTS.produtos.listar);
    return handleResponse(res);
  },

  buscarPorId: async (id: number): Promise<Produto> => {
    const res = await fetch(ENDPOINTS.produtos.buscarPorId(id));
    return handleResponse(res);
  },

  alterar: async (id: number, dados: Partial<Produto>): Promise<Produto> => {
    const res = await fetch(ENDPOINTS.produtos.alterar(id), {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dados),
    });
    return handleResponse(res);
  },

  excluir: async (id: number): Promise<void> => {
    const res = await fetch(ENDPOINTS.produtos.excluir(id), {
      method: "DELETE",
    });
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new Error(`HTTP ${res.status}: ${text || res.statusText}`);
    }
  },

  eletronicos: {
    listar: async (): Promise<ProdutoEletronico[]> => {
      const res = await fetch(ENDPOINTS.produtos.eletronicos.listar);
      return handleResponse(res);
    },

    cadastrar: async (
      dados: CadastrarEletronicoPayload,
    ): Promise<ProdutoEletronico> => {
      const res = await fetch(ENDPOINTS.produtos.eletronicos.cadastrar, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados),
      });
      return handleResponse(res);
    },
  },

  pereciveis: {
    listar: async (): Promise<ProdutoPerecivel[]> => {
      const res = await fetch(ENDPOINTS.produtos.pereciveis.listar);
      return handleResponse(res);
    },

    cadastrar: async (
      dados: CadastrarPerecivelPayload,
    ): Promise<ProdutoPerecivel> => {
      const res = await fetch(ENDPOINTS.produtos.pereciveis.cadastrar, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados),
      });
      return handleResponse(res);
    },
  },
};
