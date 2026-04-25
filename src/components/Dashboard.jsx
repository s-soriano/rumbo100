import { formatCLP, formatPercent } from '../utils/formatters';

const CARDS = [
  { label: 'Valor total de cartera', key: 'totalCartera', format: 'clp', color: 'blue', icon: '💼' },
  { label: 'Dividendos anuales brutos', key: 'dividendosAnualesBrutos', format: 'clp', color: 'green', icon: '📅' },
  { label: 'Dividendos mensuales brutos', key: 'dividendosMensuales', format: 'clp', color: 'green', icon: '📆' },
  { label: 'Yield promedio cartera', key: 'yieldPromedio', format: 'percent', color: 'teal', icon: '📊' },
  { label: 'Impuesto estimado anual', key: 'impuestoEstimado', format: 'clp', color: 'yellow', icon: '🧾' },
  { label: 'Dividendos netos anuales', key: 'dividendosNetos', format: 'clp', color: 'teal', icon: '✅' },
];

export default function Dashboard({ resumen }) {
  return (
    <div className="dashboard">
      <div className="cards-grid">
        {CARDS.map((card) => (
          <div key={card.key} className={`card card-accent-${card.color}`}>
            <div className="card-icon">{card.icon}</div>
            <div className="card-label">{card.label}</div>
            <div className="card-value">
              {card.format === 'clp'
                ? formatCLP(resumen[card.key])
                : formatPercent(resumen[card.key])}
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-highlight">
        <div className="card text-center">
          <div className="card-label">Dividendos netos mensuales estimados</div>
          <div className="big-number green">{formatCLP(resumen.dividendosNetosMensuales)}</div>
          <div className="card-sub">Después del impuesto estimado configurado</div>
        </div>
      </div>
    </div>
  );
}
