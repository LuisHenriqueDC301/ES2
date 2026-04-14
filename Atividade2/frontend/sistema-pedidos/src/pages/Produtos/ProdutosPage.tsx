import { useState } from "react";
import {
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
  const { cadastrar: cadastrarEletronico } = useProdutosEletronicos();
  const { cadastrar: cadastrarPerecivel } = useProdutosPereciveis();

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

      {tab === "todos" && <TodosProdutos />}
      {tab === "eletronicos" && <EletronicosTab />}
      {tab === "pereciveis" && <PerecivelTab />}

      <NovoProdutoModal
        open={modalAberto}
        onClose={() => setModalAberto(false)}
        onCadastrarEletronico={cadastrarEletronico}
        onCadastrarPerecivel={cadastrarPerecivel}
      />
    </div>
  );
}
