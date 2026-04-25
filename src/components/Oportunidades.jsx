import { CHILE_STOCKS } from '../data/chileStocks';
import { formatPercent, formatCLP } from '../utils/formatters';

function DividendSparkline({ history }) {
  if (!history || history.length === 0) return null;
  const max = Math.max(...history.map((h) => h.amount));
  return (
    <div className="spark-wrap">
      {history.map((h) => (
        <div key={h.year} className="spark-bar-wrap">
          <div
            className="spark-bar"
            style={{ height: `${Math.round((h.amount / max) * 36)}px` }}
            title={`${h.year}: $${h.amount.toLocaleString('es-CL')}`}
          />
          <span className="spark-year">{String(h.year).slice(2)}</span>
        </div>
      ))}
    </div>
  );
}

function StockCard({ stock, rank, scoreLabel }) {
  const score = (stock.dividendYield + stock.growthEstimate).toFixed(1);
  return (
    <div className="oport-card">
      <div className="oport-card-top">
        <span className="oport-rank">{rank}</span>
        <div className="oport-card-header">
          <span className="oport-ticker">{stock.ticker}</span>
          <span className="oport-sector">{stock.sector}</span>
        </div>
        <span className="oport-nombre">{stock.nombre}</span>
      </div>

      <div className="oport-metrics">
        <div className="oport-metric">
          <span className="oport-metric-label">Yield</span>
          <span className="oport-metric-value col-green">{formatPercent(stock.dividendYield)}</span>
        </div>
        <div className="oport-metric">
          <span className="oport-metric-label">Crecimiento</span>
          <span className="oport-metric-value col-teal">{formatPercent(stock.growthEstimate)}</span>
        </div>
        {scoreLabel && (
          <div className="oport-metric">
            <span className="oport-metric-label">Score</span>
            <span className="oport-metric-value col-blue">{formatPercent(parseFloat(score))}</span>
          </div>
        )}
        <div className="oport-metric">
          <span className="oport-metric-label">Precio</span>
          <span className="oport-metric-value">{formatCLP(stock.price)}</span>
        </div>
      </div>

      <div className="oport-history-label">Dividendo/acción (CLP)</div>
      <DividendSparkline history={stock.dividendHistory} />
    </div>
  );
}

export default function Oportunidades() {
  const byYield = [...CHILE_STOCKS]
    .sort((a, b) => b.dividendYield - a.dividendYield)
    .slice(0, 5);

  const byScore = [...CHILE_STOCKS]
    .sort((a, b) => b.dividendYield + b.growthEstimate - (a.dividendYield + a.growthEstimate))
    .slice(0, 5);

  return (
    <div className="oport-container">
      <div className="oport-section">
        <h3 className="section-title">🏆 Top 5 — Mayor Dividend Yield</h3>
        <p className="oport-desc">Acciones con mayor rendimiento por dividendo en la base de datos</p>
        <div className="oport-grid">
          {byYield.map((stock, i) => (
            <StockCard key={stock.ticker} stock={stock} rank={`#${i + 1}`} />
          ))}
        </div>
      </div>

      <div className="oport-section">
        <h3 className="section-title">🚀 Top 5 — Crecimiento + Yield combinados</h3>
        <p className="oport-desc">Mejor puntuación combinada: dividendo actual + potencial de crecimiento</p>
        <div className="oport-grid">
          {byScore.map((stock, i) => (
            <StockCard key={stock.ticker} stock={stock} rank={`#${i + 1}`} scoreLabel />
          ))}
        </div>
      </div>

      <p className="disclaimer-small" style={{ marginTop: '8px' }}>
        Datos referenciales para simulación. No constituyen recomendación de inversión.
      </p>
    </div>
  );
}
