import { Link } from "react-router-dom";
import { ROUTES } from "../../constants/RoutesPath";

const cards = [
  {
    to: ROUTES.produtos,
    title: "Produtos",
    description: "Cadastre, edite e gerencie seu catálogo de produtos.",
    color: "blue" as const,
    icon: (
      <svg
        className="h-7 w-7"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"
        />
      </svg>
    ),
  },
  {
    to: ROUTES.pedidos,
    title: "Pedidos",
    description: "Crie novos pedidos e acompanhe os existentes.",
    color: "emerald" as const,
    icon: (
      <svg
        className="h-7 w-7"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15a2.25 2.25 0 0 1 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
        />
      </svg>
    ),
  },
];

const colorMap = {
  blue: {
    bg: "bg-blue-50",
    icon: "text-blue-600",
    ring: "group-hover:ring-blue-200",
    iconBg: "bg-blue-100",
  },
  emerald: {
    bg: "bg-emerald-50",
    icon: "text-emerald-600",
    ring: "group-hover:ring-emerald-200",
    iconBg: "bg-emerald-100",
  },
};

export function HomePage() {
  return (
    <div className="flex flex-col items-center pt-12 pb-20">
      <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 shadow-lg shadow-blue-200/50">
        <svg
          className="h-7 w-7 text-white"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.8}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"
          />
        </svg>
      </div>

      <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-2">
        Sistema de Pedidos
      </h1>
      <p className="max-w-sm text-center text-slate-500 mb-12">
        Gerencie seu catálogo de produtos e acompanhe pedidos em um só lugar.
      </p>

      <div className="grid w-full max-w-lg grid-cols-1 gap-4 sm:grid-cols-2">
        {cards.map((card) => {
          const colors = colorMap[card.color];
          return (
            <Link
              key={card.to}
              to={card.to}
              className={`group relative flex flex-col gap-4 rounded-2xl border border-slate-200/80 bg-white p-6 ring-1 ring-transparent ${colors.ring} shadow-sm hover:shadow-md transition-all duration-200`}
            >
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-xl ${colors.iconBg} ${colors.icon}`}
              >
                {card.icon}
              </div>
              <div>
                <h2 className="text-base font-semibold text-slate-800 mb-1">
                  {card.title}
                </h2>
                <p className="text-sm leading-relaxed text-slate-500">
                  {card.description}
                </p>
              </div>
              <svg
                className="absolute right-5 top-6 h-5 w-5 text-slate-300 transition-transform group-hover:translate-x-0.5 group-hover:text-slate-400"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m8.25 4.5 7.5 7.5-7.5 7.5"
                />
              </svg>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
