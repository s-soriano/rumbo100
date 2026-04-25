import { calcularMetricasAccion, calcularTotalCartera } from '../utils/calculations';
import { formatCLP, formatPercent } from '../utils/formatters';

export default function PortfolioTable({ portfolio, onEdit, onDelete }) {
  if (portfolio.length === 0) {
    return (
      <div className="empty-state">
        <div>
          <p>📋 Tu cartera está vacía.</p>
          <p>Agrega acciones desde el panel izquierdo para comenzar.</p>
        </div>
      </div>
    );
  }

  const totalCartera = calcularTotalCartera(portfolio);

  return (
    <div className="table-wrapper">
      <div className="table-scroll">
        <table className="data-table">
          <thead>
            <tr>
              <th>Ticker</th>
              <th>Empresa</th>
              <th>Sector</th>
              <th>Cant.</th>
              <th>P. Prom.</th>
              <th>P. Actual</th>
              <th>Valor inv.</th>
              <th>Div. anual</th>
              <th>Div. mensual</th>
              <th>Yield</th>
              <th>YoC</th>
              <th>Rentab.</th>
              <th>Peso</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {portfolio.map((accion) => {
              const m = calcularMetricasAccion(accion, totalCartera);
              return (
                <tr key={accion.id}>
                  <td>
                    <span className="ticker-badge">{accion.ticker}</span>
                  </td>
                  <td className="td-truncate">{accion.nombre || '—'}</td>
                  <td>
                    <span className="sector-tag">{accion.sector || '—'}</span>
                  </td>
                  <td>{accion.cantidad.toLocaleString('es-CL')}</td>
                  <td>{formatCLP(accion.precioPromedio)}</td>
                  <td>{formatCLP(accion.precioActual)}</td>
                  <td>{formatCLP(m.valorInvertido)}</td>
                  <td className="col-green">{formatCLP(m.dividendoAnualBruto)}</td>
                  <td className="col-green">{formatCLP(m.dividendoMensual)}</td>
                  <td>{formatPercent(accion.dividendYield)}</td>
                  <td>{formatPercent(m.yieldOnCost)}</td>
                  <td className={m.rentabilidad >= 0 ? 'col-green' : 'col-red'}>
                    {formatPercent(m.rentabilidad)}
                  </td>
                  <td>{formatPercent(m.pesoCartera, 1)}</td>
                  <td>
                    <div className="row-actions">
                      <button
                        onClick={() => onEdit(accion)}
                        className="btn-icon"
                        title="Editar"
                        aria-label="Editar"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm(`¿Eliminar ${accion.ticker} de tu cartera?`)) {
                            onDelete(accion.id);
                          }
                        }}
                        className="btn-icon"
                        title="Eliminar"
                        aria-label="Eliminar"
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="table-note">
        Cartera: {portfolio.length} acción{portfolio.length !== 1 ? 'es' : ''} •
        Total invertido: {formatCLP(totalCartera)}
      </p>
    </div>
  );
}
