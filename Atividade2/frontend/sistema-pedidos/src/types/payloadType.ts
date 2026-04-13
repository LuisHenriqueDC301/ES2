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