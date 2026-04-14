import { useState } from "react";
import {
  TodosProdutos,
  EletronicosTab,
  PerecivelTab,
  ProdutoTabs,
} from "../../components/Produtos";

type Tab = "todos" | "eletronicos" | "pereciveis";

const produtoTabs: { key: Tab; label: string }[] = [
  { key: "todos", label: "Todos" },
  { key: "eletronicos", label: "Eletrônicos" },
  { key: "pereciveis", label: "Perecíveis" },
];

export function ProdutosPage() {
  const [tab, setTab] = useState<Tab>("todos");

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Produtos
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Gerencie seu catálogo de produtos.
        </p>
      </div>

      <div className="mb-6">
        <ProdutoTabs<Tab> tabs={produtoTabs} active={tab} onChange={setTab} />
      </div>

      {tab === "todos" && <TodosProdutos />}
      {tab === "eletronicos" && <EletronicosTab />}
      {tab === "pereciveis" && <PerecivelTab />}
    </div>
  );
}
