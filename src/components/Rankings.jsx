import { calcularMetricasAccion, calcularTotalCartera } from '../utils/calculations';
import { formatCLP, formatPercent } from '../utils/formatters';

function RankList({ items, valueKey, formatFn, title, colorClass }) {
  return (
    <div className="card ranking-card">
      <h4 className="ranking-title">{title}</h4>
      {items.slice(0, 5).map((item, i) => (
        <div key={item.id} className="ranking-row">
          <span className="rank-pos">#{i + 1}</span>
          <span className="rank-ticker">{item.ticker}</span>
          <span className={`rank-value ${colorClass}`}>{formatFn(item[valueKey])}</span>
        </div>
      ))}
    </div>
  );
}

export default function Rankings({ portfolio }) {
  if (portfolio.length === 0) {
    return (
      <div className="empty-state">
        <div>
          <p>🏆 Agrega acciones a tu cartera para ver los rankings.</p>
        </div>
      </div>
    );
  }

  const totalCartera = calcularTotalCartera(portfolio);
  const enriched = portfolio.map((a) => ({
    ...a,
    ...calcularMetricasAccion(a, totalCartera),
  }));

  const byDividendo = [...enriched].sort((a, b) => b.dividendoAnualBruto - a.dividendoAnualBruto);
  const byYOC = [...enriched].sort((a, b) => b.yieldOnCost - a.yieldOnCost);
  const byPeso = [...enriched].sort((a, b) => b.pesoCartera - a.pesoCartera);
  const byRentabilidad = [...enriched].sort((a, b) => a.rentabilidad - b.rentabilidad);

  return (
    <div className="rankings-grid">
      <RankList
        items={byDividendo}
        valueKey="dividendoAnualBruto"
        formatFn={formatCLP}
        title="Mayor aporte a dividendos"
        colorClass="col-green"
      />
      <RankList
        items={byYOC}
        valueKey="yieldOnCost"
        formatFn={(v) => formatPercent(v)}
        title="Mayor Yield on Cost (YoC)"
        colorClass="col-green"
      />
      <RankList
        items={byPeso}
        valueKey="pesoCartera"
        formatFn={(v) => formatPercent(v, 1)}
        title="Mayor peso en cartera"
        colorClass="col-blue"
      />
      <RankList
        items={byRentabilidad}
        valueKey="rentabilidad"
        formatFn={(v) => formatPercent(v)}
        title="Peor rentabilidad de precio"
        colorClass="col-red"
      />
    </div>
  );
}
