// INTEGRACIÓN FUTURA:
// - SendGrid/Resend: emails reales cuando condición se dispara
// - Supabase Realtime: evaluar condiciones contra precios en vivo
// - CMF API: precios reales en lugar de CHILE_STOCKS mock

import { useState, useEffect, useRef } from 'react';
import LockScreen from './LockScreen';
import { CHILE_STOCKS } from '../data/chileStocks';
import {
  loadAlertasPro,
  saveAlertasPro,
  CONDICION_LABELS,
  TIPOS_HE,
} from '../data/alertasPro';
import { HECHOS_ESENCIALES, TIPO_HECHO_CONFIG } from '../data/hechosEsenciales';
import { sendAlertEmail } from '../utils/emailService';
import { formatCLP, formatPercent } from '../utils/formatters';

// ─── Toast ──────────────────────────────────────────────────────────────────
function Toast({ message, onDismiss }) {
  if (!message) return null;
  return (
    <div className="toast-banner" onClick={onDismiss}>
      <span>{message}</span>
      <button className="toast-close">✕</button>
    </div>
  );
}

// ─── Formulario alerta de precio ────────────────────────────────────────────
const EMPTY_PRICE = { ticker: CHILE_STOCKS[0].ticker, condicion: 'below', valor: '', email: '' };

function FormPrecio({ onAdd }) {
  const [form, setForm] = useState(EMPTY_PRICE);

  const handle = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    const num = parseFloat(form.valor);
    if (!num || num <= 0 || !form.email) return;
    onAdd({ ...form, valor: num });
    setForm(EMPTY_PRICE);
  };

  return (
    <form className="apro-form" onSubmit={submit}>
      <div className="apro-form-row">
        <div className="form-group">
          <label>Acción</label>
          <select name="ticker" value={form.ticker} onChange={handle} className="input">
            {CHILE_STOCKS.map((s) => (
              <option key={s.ticker} value={s.ticker}>{s.ticker} — {s.nombre}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Condición</label>
          <select name="condicion" value={form.condicion} onChange={handle} className="input">
            <option value="below">Precio menor que</option>
            <option value="above">Precio mayor que</option>
          </select>
        </div>
        <div className="form-group">
          <label>Precio ($)</label>
          <input
            type="number"
            name="valor"
            value={form.valor}
            onChange={handle}
            className="input"
            placeholder="Ej: 3500"
            min="0"
            step="any"
            required
          />
        </div>
        <div className="form-group apro-email">
          <label>Email de alerta</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handle}
            className="input"
            placeholder="tu@email.com"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary apro-add-btn">
          + Añadir
        </button>
      </div>
    </form>
  );
}

// ─── Formulario suscripción HE ────────────────────────────────────────────
const TICKERS_HE = [...new Set(HECHOS_ESENCIALES.map((h) => h.ticker))];

function FormHESuscripcion({ onAdd }) {
  const [tickers, setTickers] = useState([]);
  const [tipos, setTipos] = useState([]);
  const [email, setEmail] = useState('');

  const toggleTicker = (t) =>
    setTickers((p) => (p.includes(t) ? p.filter((x) => x !== t) : [...p, t]));
  const toggleTipo = (t) =>
    setTipos((p) => (p.includes(t) ? p.filter((x) => x !== t) : [...p, t]));

  const submit = (e) => {
    e.preventDefault();
    if (!tickers.length || !tipos.length || !email) return;
    onAdd({ tickers, tipos, email });
    setTickers([]);
    setTipos([]);
    setEmail('');
  };

  return (
    <form className="apro-form" onSubmit={submit}>
      <div className="apro-he-row">
        <div className="form-group">
          <label>Acciones a monitorear</label>
          <div className="check-group">
            {TICKERS_HE.map((t) => (
              <label key={t} className="check-pill">
                <input
                  type="checkbox"
                  checked={tickers.includes(t)}
                  onChange={() => toggleTicker(t)}
                />
                {t}
              </label>
            ))}
          </div>
        </div>
        <div className="form-group">
          <label>Tipos de hecho</label>
          <div className="check-group">
            {TIPOS_HE.map((t) => (
              <label key={t} className="check-pill">
                <input
                  type="checkbox"
                  checked={tipos.includes(t)}
                  onChange={() => toggleTipo(t)}
                />
                {TIPO_HECHO_CONFIG[t]?.label || t}
              </label>
            ))}
          </div>
        </div>
        <div className="form-group apro-email">
          <label>Email de notificación</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
            placeholder="tu@email.com"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary apro-add-btn">
          + Suscribir
        </button>
      </div>
    </form>
  );
}

// ─── Componente principal ────────────────────────────────────────────────────
export default function AlertasPro({ isPro, onUpgrade }) {
  const [data, setData] = useState(() => loadAlertasPro());
  const [toast, setToast] = useState(null);
  const [emailLog, setEmailLog] = useState([]);
  const toastTimer = useRef(null);

  useEffect(() => {
    saveAlertasPro(data);
  }, [data]);

  function showToast(msg) {
    setToast(msg);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 5000);
  }

  async function dispararEmail(tipo, datos, email, label) {
    const result = await sendAlertEmail(tipo, datos, email);
    const entry = `📧 Email enviado a ${email} — ${label} (${result.sentAt})`;
    setEmailLog((p) => [entry, ...p].slice(0, 20));
    showToast(`📧 Email enviado a ${email}`);
  }

  // Alertas de precio: evaluar contra CHILE_STOCKS
  const precioTriggered = data.precioAlertas.filter((a) => {
    const stock = CHILE_STOCKS.find((s) => s.ticker === a.ticker);
    if (!stock) return false;
    return a.condicion === 'above' ? stock.price > a.valor : stock.price < a.valor;
  });

  // Hechos que coinciden con suscripciones
  function hechoMatchesSub(hecho, sub) {
    return sub.tickers.includes(hecho.ticker) && sub.tipos.includes(hecho.tipo);
  }

  const heTriggered = data.heSubscriptions.flatMap((sub) =>
    HECHOS_ESENCIALES.filter((h) => hechoMatchesSub(h, sub)).map((h) => ({
      hecho: h,
      email: sub.email,
      subId: sub.id,
    }))
  );

  function addPrecioAlerta(alerta) {
    const newA = { ...alerta, id: Date.now().toString(), creadaEl: Date.now() };
    setData((p) => ({ ...p, precioAlertas: [...p.precioAlertas, newA] }));
  }

  function deletePrecioAlerta(id) {
    setData((p) => ({ ...p, precioAlertas: p.precioAlertas.filter((a) => a.id !== id) }));
  }

  function addHESub(sub) {
    const newS = { ...sub, id: Date.now().toString(), creadaEl: Date.now() };
    setData((p) => ({ ...p, heSubscriptions: [...p.heSubscriptions, newS] }));
  }

  function deleteHESub(id) {
    setData((p) => ({ ...p, heSubscriptions: p.heSubscriptions.filter((s) => s.id !== id) }));
  }

  if (!isPro) {
    return (
      <LockScreen
        message="Configura alertas de precio con notificación por email y suscríbete a hechos esenciales CMF específicos por ticker y tipo de evento."
        onUpgrade={onUpgrade}
      />
    );
  }

  return (
    <div className="apro-container">
      <Toast message={toast} onDismiss={() => setToast(null)} />

      {/* ── Alertas de precio ── */}
      <div className="apro-section">
        <h3 className="section-title">🔔 Alertas de precio con email</h3>
        <FormPrecio onAdd={addPrecioAlerta} />

        {data.precioAlertas.length > 0 && (
          <div className="apro-list">
            <div className="apro-list-header">Alertas configuradas</div>
            {data.precioAlertas.map((a) => {
              const stock = CHILE_STOCKS.find((s) => s.ticker === a.ticker);
              const isTriggered = precioTriggered.some((t) => t.id === a.id);
              return (
                <div key={a.id} className={`apro-item ${isTriggered ? 'apro-item-triggered' : ''}`}>
                  <span className="apro-item-ticker">{a.ticker}</span>
                  <span className="apro-item-cond">
                    {CONDICION_LABELS[a.condicion]} ${a.valor.toLocaleString('es-CL')}
                  </span>
                  {stock && (
                    <span className="apro-item-actual">
                      Actual: {formatCLP(stock.price)}
                    </span>
                  )}
                  {isTriggered && (
                    <span className="apro-triggered-badge">⚡ Activa</span>
                  )}
                  <span className="apro-item-email">{a.email}</span>
                  {isTriggered && (
                    <button
                      className="btn btn-secondary apro-send-btn"
                      onClick={() =>
                        dispararEmail(
                          'precio',
                          { ticker: a.ticker, condicion: a.condicion, umbral: a.valor, precioActual: stock?.price },
                          a.email,
                          `${a.ticker} ${CONDICION_LABELS[a.condicion]} $${a.valor}`
                        )
                      }
                    >
                      📧 Simular envío
                    </button>
                  )}
                  <button
                    className="btn btn-ghost apro-del-btn"
                    onClick={() => deletePrecioAlerta(a.id)}
                  >
                    ✕
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {precioTriggered.length > 0 && (
          <div className="apro-triggered-summary">
            <span className="alert-pill pill-warning">
              ⚡ {precioTriggered.length} alerta{precioTriggered.length !== 1 ? 's' : ''} activa{precioTriggered.length !== 1 ? 's' : ''} ahora
            </span>
          </div>
        )}
      </div>

      {/* ── Suscripciones a Hechos Esenciales ── */}
      <div className="apro-section">
        <h3 className="section-title">📋 Suscripciones a Hechos Esenciales CMF</h3>
        <FormHESuscripcion onAdd={addHESub} />

        {data.heSubscriptions.length > 0 && (
          <div className="apro-list">
            <div className="apro-list-header">Suscripciones configuradas</div>
            {data.heSubscriptions.map((sub) => (
              <div key={sub.id} className="apro-item">
                <span className="apro-item-ticker">{sub.tickers.join(', ')}</span>
                <span className="apro-item-cond">
                  {sub.tipos.map((t) => TIPO_HECHO_CONFIG[t]?.label || t).join(' · ')}
                </span>
                <span className="apro-item-email">{sub.email}</span>
                <button
                  className="btn btn-ghost apro-del-btn"
                  onClick={() => deleteHESub(sub.id)}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}

        {heTriggered.length > 0 && (
          <div className="apro-list" style={{ marginTop: '10px' }}>
            <div className="apro-list-header apro-list-header-triggered">
              📣 Hechos que activarían notificaciones ({heTriggered.length})
            </div>
            {heTriggered.slice(0, 5).map((item, i) => (
              <div key={i} className="apro-item apro-item-triggered">
                <span className="apro-item-ticker">{item.hecho.ticker}</span>
                <span className="apro-item-cond apro-item-titulo">{item.hecho.titulo}</span>
                <span className="apro-item-email">{item.email}</span>
                <button
                  className="btn btn-secondary apro-send-btn"
                  onClick={() =>
                    dispararEmail(
                      'hecho_esencial',
                      { ticker: item.hecho.ticker, titulo: item.hecho.titulo, fecha: item.hecho.fecha },
                      item.email,
                      `HE: ${item.hecho.ticker} — ${item.hecho.titulo.slice(0, 40)}…`
                    )
                  }
                >
                  📧 Simular envío
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Log de emails ── */}
      {emailLog.length > 0 && (
        <div className="apro-section">
          <h3 className="section-title">📬 Log de emails simulados</h3>
          <div className="email-log">
            {emailLog.map((entry, i) => (
              <div key={i} className="email-log-entry">
                {entry}
              </div>
            ))}
          </div>
        </div>
      )}

      <p className="disclaimer-small" style={{ marginTop: '4px' }}>
        Emails simulados (console.log). En producción: SendGrid/Resend API con backend.
      </p>
    </div>
  );
}
