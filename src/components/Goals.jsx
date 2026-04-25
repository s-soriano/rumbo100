import { calcularMeta } from '../utils/calculations';
import { formatCLP } from '../utils/formatters';

export default function Goals({ resumen, goals, onGoalsChange }) {
  const meta = calcularMeta(resumen, goals);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    onGoalsChange((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : parseFloat(value) || 0,
    }));
  };

  return (
    <div className="goals-container">
      <div className="card goals-form-card">
        <h3 className="section-title">Configurar meta de ingreso pasivo</h3>
        <div className="form-row">
          <div className="form-group">
            <label>Meta mensual neta ($)</label>
            <input
              type="number"
              name="metaMensual"
              value={goals.metaMensual}
              onChange={handleChange}
              className="input"
              min="0"
              step="10000"
            />
          </div>
          <div className="form-group">
            <label>Plazo (años)</label>
            <input
              type="number"
              name="anos"
              value={goals.anos}
              onChange={handleChange}
              className="input"
              min="1"
              max="50"
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Aporte mensual ($)</label>
            <input
              type="number"
              name="aporteMensual"
              value={goals.aporteMensual}
              onChange={handleChange}
              className="input"
              min="0"
              step="10000"
            />
          </div>
          <div className="form-group form-group-check">
            <label className="check-label">
              <input
                type="checkbox"
                name="reinvertir"
                checked={goals.reinvertir}
                onChange={handleChange}
              />
              <span>Reinvertir dividendos</span>
            </label>
          </div>
        </div>
      </div>

      <div className={`card goal-status-card ${meta.alcanzaMeta ? 'goal-met' : 'goal-miss'}`}>
        <div className="goal-icon">{meta.alcanzaMeta ? '🎯' : '📍'}</div>
        <div className="goal-message">
          {meta.alcanzaMeta
            ? `¡Meta alcanzada! Tu cartera genera más de ${formatCLP(goals.metaMensual)} neto al mes.`
            : `Aún no alcanzas tu meta de ${formatCLP(goals.metaMensual)}/mes neto.`}
        </div>
      </div>

      <div className="goals-cards-grid">
        <div className="card">
          <div className="card-label">Dividendos netos actuales/mes</div>
          <div className="card-value col-green">{formatCLP(resumen.dividendosNetosMensuales)}</div>
        </div>
        <div className="card">
          <div className="card-label">Brecha mensual faltante</div>
          <div className="card-value col-yellow">{formatCLP(meta.brechaMensual)}</div>
        </div>
        <div className="card">
          <div className="card-label">Capital necesario para la meta</div>
          <div className="card-value col-blue">{formatCLP(meta.capitalNecesario)}</div>
        </div>
        <div className="card">
          <div className="card-label">Capital faltante estimado</div>
          <div className="card-value">{formatCLP(meta.capitalFaltante)}</div>
        </div>
        <div className="card">
          <div className="card-label">Aporte mensual aproximado necesario</div>
          <div className="card-value">{formatCLP(meta.aporteMensualNecesario)}</div>
        </div>
      </div>

      <p className="disclaimer-small">
        Estimación simplificada basada en el yield promedio actual. No considera variaciones de precio, cambios de dividendos ni inflación. Para planificación real, consulte un asesor financiero.
      </p>
    </div>
  );
}
