import { useCallback, useEffect, useState } from "react";
import { pedidoService } from "../services/pedidoService";
import type { Pedido, AdicionarItemPayload } from "../types";

export function usePedidos() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const carregar = useCallback(async (showLoading = true) => {
    if (showLoading) setLoading(true);
    setError(null);
    try {
      setPedidos(await pedidoService.listar());
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erro ao carregar pedidos");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    carregar();
  }, [carregar]);

  const cadastrar = async () => {
    const novo = await pedidoService.cadastrar();
    await carregar();
    return novo;
  };

  const adicionarItem = async (
    pedidoId: number,
    dados: AdicionarItemPayload,
  ) => {
    await pedidoService.adicionarItem(pedidoId, dados);
    await carregar(false);
  };

  return { pedidos, loading, error, carregar, cadastrar, adicionarItem };
}
