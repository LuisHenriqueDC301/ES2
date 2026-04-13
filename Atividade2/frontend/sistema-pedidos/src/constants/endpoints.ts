const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const ENDPOINTS = {
  produtos: {
    listar: `${BASE_URL}/produtos`,
    buscarPorId: (id: number) => `${BASE_URL}/produtos/${id}`,
    cadastrar: `${BASE_URL}/produtos`,
    alterar: (id: number) => `${BASE_URL}/produtos/${id}`,
    excluir: (id: number) => `${BASE_URL}/produtos/${id}`,
    eletronicos: {
      listar: `${BASE_URL}/produtos/eletronicos`,
      cadastrar: `${BASE_URL}/produtos/eletronicos`,
    },
    pereciveis: {
      listar: `${BASE_URL}/produtos/pereciveis`,
      cadastrar: `${BASE_URL}/produtos/pereciveis`,
    },
  },
  pedidos: {
    listar: `${BASE_URL}/pedidos`,
    buscarPorId: (id: number) => `${BASE_URL}/pedidos/${id}`,
    cadastrar: `${BASE_URL}/pedidos`,
    adicionarItem: (id: number) => `${BASE_URL}/pedidos/${id}/itens`,
  },
};
