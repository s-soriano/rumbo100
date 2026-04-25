import { calcularProyeccion } from '../utils/calculations';
import { formatCLP } from '../utils/formatters';

export default function ProjectionTable({ portfolio, taxRate, goals }) {
  if (portfolio.length === 0) {
    return (
      <div className="empty-state">
        <div>
          <p>📈 Agrega acciones a tu cartera para ver la proyección.</p>
        </div>
      </div>
    );
  }

  const proyeccion = calcularProyeccion(
    portfolio,
    taxRate,
    goals.aporteMensual,
    goals.reinvertir,
    20
  );

  return (
    <div className="projection-container">
      <div className="projection-meta">
        <span>Proyección a 20 años</span>
        <span>Aporte mensual: <strong>{formatCLP(goals.aporteMensual)}</strong></span>
        <span>Reinversión de dividendos: <strong>{goals.reinvertir ? 'Sí' : 'No'}</strong></span>
        <span>Tasa impuesto: <strong>{taxRate}%</strong></span>
      </div>

      <div className="table-wrapper">
        <div className="table-scroll">
          <table className="data-table">
            <thead>
              <tr>
                <th>Año</th>
                <th>Valor cartera</th>
                <th>Div. brutos anuales</th>
                <th>Div. netos anuales</th>
                <th>Div. netos mensuales</th>
              </tr>
            </thead>
            <tbody>
              {proyeccion.map((row) => (
                <tr key={row.year} className={row.year % 5 === 0 ? 'row-milestone' : ''}>
                  <td>
                    <strong>Año {row.year}</strong>
                    {row.year % 5 === 0 && <span className="milestone-badge">hito</span>}
                  </td>
                  <td>{formatCLP(row.valorCartera)}</td>
                  <td className="col-green">{formatCLP(row.dividendosBrutos)}</td>
                  <td className="col-green">{formatCLP(row.dividendosNetos)}</td>
                  <td className="col-green">
                    <strong>{formatCLP(row.dividendosMensualesNetos)}</strong>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <p className="disclaimer-small">
        Proyección estimada. Asume crecimiento promedio constante, yield estable y aportes regulares. Los resultados reales pueden variar significativamente.
      </p>
    </div>
  );
}
