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