import { useCallback, useEffect, useState } from "react";
import { produtoService } from "../services/produtoService";
import type {
  Produto,
  ProdutoEletronico,
  ProdutoPerecivel,
  CadastrarEletronicoPayload,
  CadastrarPerecivelPayload,
} from "../types";

export function useProdutos() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const carregar = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setProdutos(await produtoService.listar());
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erro ao carregar produtos");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    carregar();
  }, [carregar]);

  const alterar = async (id: number, dados: Partial<Produto>) => {
    await produtoService.alterar(id, dados);
    await carregar();
  };

  const excluir = async (id: number) => {
    await produtoService.excluir(id);
    await carregar();
  };

  return { produtos, loading, error, carregar, alterar, excluir };
}

export function useProdutosEletronicos() {
  const [produtos, setProdutos] = useState<ProdutoEletronico[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const carregar = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setProdutos(await produtoService.eletronicos.listar());
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erro ao carregar eletrônicos");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    carregar();
  }, [carregar]);

  const cadastrar = async (dados: CadastrarEletronicoPayload) => {
    await produtoService.eletronicos.cadastrar(dados);
    await carregar();
  };

  return { produtos, loading, error, carregar, cadastrar };
}

export function useProdutosPereciveis() {
  const [produtos, setProdutos] = useState<ProdutoPerecivel[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const carregar = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setProdutos(await produtoService.pereciveis.listar());
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erro ao carregar perecíveis");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    carregar();
  }, [carregar]);

  const cadastrar = async (dados: CadastrarPerecivelPayload) => {
    await produtoService.pereciveis.cadastrar(dados);
    await carregar();
  };

  return { produtos, loading, error, carregar, cadastrar };
}
