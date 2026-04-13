// src/types/index.ts

export interface Produto {
  id: number;
  nome: string;
  preco: number;
  estoque: number;
}

export interface ProdutoEletronico extends Produto {
  voltagem: number;
}

export interface ProdutoPerecivel extends Produto {
  dataValidade: string;
}

export interface ItemPedido {
  codigoItem: number;
  qtde: number;
  valorItem: number;
  produto: Produto;
}

export interface Pedido {
  id: number;
  data: string;
  valorTotal: number;
  itens: ItemPedido[];
}

// Payloads para requisições
export interface CadastrarEletronicoPayload {
  nome: string;
  preco: number;
  estoque: number;
  voltagem: number;
}

export interface CadastrarPerecivelPayload {
  nome: string;
  preco: number;
  estoque: number;
  dataValidade: string;
}

export interface AdicionarItemPayload {
  produtoId: number;
  qtde: number;
}