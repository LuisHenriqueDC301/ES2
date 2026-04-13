import type { Produto } from "./produtoType";

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
