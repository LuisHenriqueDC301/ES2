import { useState } from "react";
import {
  useProdutos,
  useProdutosEletronicos,
  useProdutosPereciveis,
} from "../../hooks/useProdutos";
import {
  TodosProdutos,
  EletronicosTab,
  PerecivelTab,
  ProdutoTabs,
  NovoProdutoModal,
} from "../../components/Produtos";

type Tab = "todos" | "eletronicos" | "pereciveis";

const produtoTabs: { key: Tab; label: string }[] = [
  { key: "todos", label: "Todos" },
  { key: "eletronicos", label: "Eletrônicos" },
  { key: "pereciveis", label: "Perecíveis" },
];

export function ProdutosPage() {
  const [tab, setTab] = useState<Tab>("todos");
  const [modalAberto, setModalAberto] = useState(false);

  const { produtos, loading, error, carregar: recarregarTodos, alterar: alterarBase, excluir: excluirBase } = useProdutos();
  const { produtos: eletronicos, loading: loadingEl, error: errorEl, cadastrar: cadastrarEletronico, carregar: recarregarEletronicos } = useProdutosEletronicos();
  const { produtos: pereciveis, loading: loadingPe, error: errorPe, cadastrar: cadastrarPerecivel, carregar: recarregarPerecivel } = useProdutosPereciveis();

  const recarregarTudo = () => Promise.all([recarregarTodos(), recarregarEletronicos(), recarregarPerecivel()]);

  const handleCadastrarEletronico = async (dados: Parameters<typeof cadastrarEletronico>[0]) => {
    await cadastrarEletronico(dados);
    await recarregarTudo();
  };

  const handleCadastrarPerecivel = async (dados: Parameters<typeof cadastrarPerecivel>[0]) => {
    await cadastrarPerecivel(dados);
    await recarregarTudo();
  };

  const handleAlterar = async (id: number, dados: Parameters<typeof alterarBase>[1]) => {
    await alterarBase(id, dados);
    await recarregarTudo();
  };

  const handleExcluir = async (id: number) => {
    await excluirBase(id);
    await recarregarTudo();
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Produtos
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Gerencie seu catálogo de produtos.
          </p>
        </div>
        <button
          onClick={() => setModalAberto(true)}
          className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 transition-colors"
        >
          + Novo Produto
        </button>
      </div>

      <div className="mb-6">
        <ProdutoTabs<Tab> tabs={produtoTabs} active={tab} onChange={setTab} />
      </div>

      {tab === "todos" && <TodosProdutos produtos={produtos} loading={loading} error={error} alterar={handleAlterar} excluir={handleExcluir} />}
      {tab === "eletronicos" && <EletronicosTab produtos={eletronicos} loading={loadingEl} error={errorEl} />}
      {tab === "pereciveis" && <PerecivelTab produtos={pereciveis} loading={loadingPe} error={errorPe} />}

      <NovoProdutoModal
        open={modalAberto}
        onClose={() => setModalAberto(false)}
        onCadastrarEletronico={handleCadastrarEletronico}
        onCadastrarPerecivel={handleCadastrarPerecivel}
      />
    </div>
  );
}
