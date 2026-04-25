// TODO: conectar API CMF https://api.cmfchile.cl/api-sbifv3/recursos_api/hecho_esencial
// Requiere autenticación OAuth2 y parsing XML/JSON según endpoint

import { useState } from 'react';
import LockScreen from './LockScreen';
import { HECHOS_ESENCIALES, TIPO_HECHO_CONFIG } from '../data/hechosEsenciales';

const ALL_TICKERS = [...new Set(HECHOS_ESENCIALES.map((h) => h.ticker))];
const ALL_TIPOS = Object.keys(TIPO_HECHO_CONFIG);

function TipoBadge({ tipo }) {
  const cfg = TIPO_HECHO_CONFIG[tipo] || TIPO_HECHO_CONFIG.otro;
  return (
    <span
      className="hecho-badge"
      style={{ color: cfg.color, background: cfg.bg }}
    >
      {cfg.label}
    </span>
  );
}

function HechoCard({ hecho }) {
  const fechaFmt = new Date(hecho.fecha + 'T12:00:00').toLocaleDateString('es-CL', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  return (
    <div className="hecho-card">
      <div className="hecho-card-header">
        <span className="hecho-ticker">{hecho.ticker}</span>
        <TipoBadge tipo={hecho.tipo} />
        <span className="hecho-fecha">{fechaFmt}</span>
      </div>
      <h4 className="hecho-titulo">{hecho.titulo}</h4>
      <p className="hecho-resumen">{hecho.resumen}</p>
      <div className="hecho-footer">
        <span className="hecho-empresa">{hecho.empresa}</span>
        <a
          href={hecho.url}
          target="_blank"
          rel="noopener noreferrer"
          className="hecho-link"
        >
          Ver en CMF →
        </a>
      </div>
    </div>
  );
}

export default function HechosEsenciales({ isPro, onUpgrade }) {
  const [tickerFilter, setTickerFilter] = useState('ALL');
  const [tipoFilter, setTipoFilter] = useState('ALL');

  if (!isPro) {
    return (
      <LockScreen
        message="Accede a los hechos esenciales registrados en la CMF para las principales acciones chilenas: dividendos, resultados trimestrales, cambios de directorio y más."
        onUpgrade={onUpgrade}
      />
    );
  }

  const filtered = HECHOS_ESENCIALES.filter((h) => {
    if (tickerFilter !== 'ALL' && h.ticker !== tickerFilter) return false;
    if (tipoFilter !== 'ALL' && h.tipo !== tipoFilter) return false;
    return true;
  }).sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

  return (
    <div className="hechos-container">
      <div className="hechos-filters">
        <div className="filter-group">
          <span className="filter-label">Acción</span>
          <div className="filter-pills">
            <button
              className={`filter-pill ${tickerFilter === 'ALL' ? 'active' : ''}`}
              onClick={() => setTickerFilter('ALL')}
            >
              Todas
            </button>
            {ALL_TICKERS.map((t) => (
              <button
                key={t}
                className={`filter-pill ${tickerFilter === t ? 'active' : ''}`}
                onClick={() => setTickerFilter(t)}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="filter-group">
          <span className="filter-label">Tipo</span>
          <div className="filter-pills">
            <button
              className={`filter-pill ${tipoFilter === 'ALL' ? 'active' : ''}`}
              onClick={() => setTipoFilter('ALL')}
            >
              Todos
            </button>
            {ALL_TIPOS.map((t) => (
              <button
                key={t}
                className={`filter-pill ${tipoFilter === t ? 'active' : ''}`}
                onClick={() => setTipoFilter(t)}
              >
                {TIPO_HECHO_CONFIG[t].label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="hechos-count">
        {filtered.length} hecho{filtered.length !== 1 ? 's' : ''} encontrado{filtered.length !== 1 ? 's' : ''}
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state">Sin hechos esenciales para los filtros seleccionados.</div>
      ) : (
        <div className="hechos-list">
          {filtered.map((h) => (
            <HechoCard key={h.id} hecho={h} />
          ))}
        </div>
      )}

      <p className="disclaimer-small" style={{ marginTop: '8px' }}>
        Datos de demostración. Fuente real: CMF Chile — api.cmfchile.cl
      </p>
    </div>
  );
}
