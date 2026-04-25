import { useState } from 'react';
import { CHILE_STOCKS } from '../data/chileStocks';

const ICON = { danger: '🔴', warning: '🟡', info: '🔵' };

const TIPO_LABELS = {
  yield_mayor: 'Yield mayor que',
  precio_menor: 'Precio menor que',
};

function AlertList({ alertas, emptyMsg }) {
  if (alertas.length === 0) {
    return (
      <div className="alert alert-success">
        <span className="alert-icon">✅</span>
        {emptyMsg}
      </div>
    );
  }
  return alertas.map((alerta, i) => (
    <div key={i} className={`alert alert-${alerta.tipo}`}>
      <span className="alert-icon">{ICON[alerta.tipo] || 'ℹ️'}</span>
      <span>{alerta.mensaje}</span>
    </div>
  ));
}

function CustomAlertForm({ onAdd }) {
  const [tipo, setTipo] = useState('yield_mayor');
  const [ticker, setTicker] = useState('ALL');
  const [valor, setValor] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const num = parseFloat(valor);
    if (!num || num <= 0) return;
    onAdd({ tipo, ticker, valor: num });
    setValor('');
  };

  return (
    <form className="custom-alert-form" onSubmit={handleSubmit}>
      <div className="caf-row">
        <div className="form-group">
          <label>Condición</label>
          <select
            className="input"
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
          >
            <option value="yield_mayor">Yield mayor que (%)</option>
            <option value="precio_menor">Precio menor que ($)</option>
          </select>
        </div>
        <div className="form-group">
          <label>Acción</label>
          <select
            className="input"
            value={ticker}
            onChange={(e) => setTicker(e.target.value)}
          >
            <option value="ALL">Todas</option>
            {CHILE_STOCKS.map((s) => (
              <option key={s.ticker} value={s.ticker}>
                {s.ticker}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Valor umbral</label>
          <input
            type="number"
            className="input"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
            placeholder={tipo === 'yield_mayor' ? 'e.g. 5' : 'e.g. 1000'}
            min="0"
            step="any"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary caf-btn">
          + Añadir
        </button>
      </div>
    </form>
  );
}

function ConfigAlertaItem({ alerta, onDelete }) {
  const label =
    alerta.ticker === 'ALL' ? 'Todas las acciones' : alerta.ticker;
  const condLabel =
    alerta.tipo === 'yield_mayor'
      ? `Yield > ${alerta.valor}%`
      : `Precio < $${alerta.valor.toLocaleString('es-CL')}`;
  return (
    <div className="alerta-config-item">
      <span className="alerta-config-ticker">{label}</span>
      <span className="alerta-config-cond">{condLabel}</span>
      <button
        className="btn btn-ghost alerta-config-del"
        onClick={() => onDelete(alerta.id)}
        title="Eliminar alerta"
      >
        ✕
      </button>
    </div>
  );
}

export default function Alerts({
  alertas,
  configAlertas,
  alertasPersonalizadas,
  onAddAlerta,
  onDeleteAlerta,
}) {
  const counts = { danger: 0, warning: 0, info: 0 };
  alertas.forEach((a) => { counts[a.tipo] = (counts[a.tipo] || 0) + 1; });
  alertasPersonalizadas.forEach((a) => { counts[a.tipo] = (counts[a.tipo] || 0) + 1; });

  const totalAlertas = alertas.length + alertasPersonalizadas.length;

  return (
    <div className="alerts-container">
      {totalAlertas > 0 && (
        <div className="alerts-summary">
          {counts.danger > 0 && (
            <span className="alert-pill pill-danger">
              {counts.danger} crítica{counts.danger !== 1 ? 's' : ''}
            </span>
          )}
          {counts.warning > 0 && (
            <span className="alert-pill pill-warning">
              {counts.warning} advertencia{counts.warning !== 1 ? 's' : ''}
            </span>
          )}
          {counts.info > 0 && (
            <span className="alert-pill pill-info">
              {counts.info} informativa{counts.info !== 1 ? 's' : ''}
            </span>
          )}
        </div>
      )}

      {/* Alertas de cartera */}
      <div className="alerts-section">
        <h4 className="alerts-section-title">Alertas de cartera</h4>
        <AlertList
          alertas={alertas}
          emptyMsg="Sin alertas de cartera. Tu portfolio está equilibrado según los parámetros configurados."
        />
      </div>

      {/* Alertas personalizadas — configuración */}
      <div className="alerts-section">
        <h4 className="alerts-section-title">Alertas personalizadas de mercado</h4>
        <CustomAlertForm onAdd={onAddAlerta} />

        {configAlertas.length > 0 && (
          <div className="alerta-config-list">
            <div className="alerta-config-header">Condiciones activas</div>
            {configAlertas.map((a) => (
              <ConfigAlertaItem key={a.id} alerta={a} onDelete={onDeleteAlerta} />
            ))}
          </div>
        )}
      </div>

      {/* Alertas personalizadas — disparadas */}
      {configAlertas.length > 0 && (
        <div className="alerts-section">
          <h4 className="alerts-section-title">Alertas disparadas ahora</h4>
          <AlertList
            alertas={alertasPersonalizadas}
            emptyMsg="Ninguna condición activa se cumple con los datos actuales."
          />
        </div>
      )}
    </div>
  );
}
