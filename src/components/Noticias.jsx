// TODO: conectar NewsAPI https://newsapi.org/docs/ o RSS feeds CMF
// TODO: conectar Google News RSS filtrado por término (litio+chile, cobre+precio, IPSA)
// Formato RSS → parse con fast-xml-parser npm package

import { useState } from 'react';
import LockScreen from './LockScreen';
import { NOTICIAS, CATEGORIA_CONFIG, IMPACTO_CONFIG } from '../data/noticias';

function ImpactoBadge({ impacto }) {
  const cfg = IMPACTO_CONFIG[impacto] || IMPACTO_CONFIG.neutral;
  return (
    <span
      className="impacto-badge"
      style={{ color: cfg.color, background: cfg.bg }}
    >
      {cfg.label}
    </span>
  );
}

function NoticiaCard({ noticia }) {
  const fechaFmt = new Date(noticia.fecha + 'T12:00:00').toLocaleDateString('es-CL', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  return (
    <div className={`noticia-card noticia-${noticia.impacto}`}>
      <div className="noticia-header">
        <ImpactoBadge impacto={noticia.impacto} />
        <span className="noticia-fuente">{noticia.fuente}</span>
        <span className="noticia-fecha">{fechaFmt}</span>
      </div>
      <h4 className="noticia-titulo">{noticia.titulo}</h4>
      <p className="noticia-resumen">{noticia.resumen}</p>
    </div>
  );
}

export default function Noticias({ isPro, onUpgrade }) {
  const [catActiva, setCatActiva] = useState('geopolitica');
  const [impactoFilter, setImpactoFilter] = useState('ALL');

  if (!isPro) {
    return (
      <LockScreen
        message="Accede a noticias en tiempo real sobre geopolítica, precios de commodities y el mercado chileno, con indicador de impacto positivo / negativo para tu cartera."
        onUpgrade={onUpgrade}
      />
    );
  }

  const filtered = NOTICIAS.filter((n) => {
    if (n.categoria !== catActiva) return false;
    if (impactoFilter !== 'ALL' && n.impacto !== impactoFilter) return false;
    return true;
  }).sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

  return (
    <div className="noticias-container">
      <div className="noticias-cat-tabs">
        {Object.entries(CATEGORIA_CONFIG).map(([key, cfg]) => (
          <button
            key={key}
            className={`noticias-cat-btn ${catActiva === key ? 'active' : ''}`}
            onClick={() => setCatActiva(key)}
          >
            {cfg.icon} {cfg.label}
          </button>
        ))}
      </div>

      <div className="noticias-filters">
        <span className="filter-label">Impacto:</span>
        {['ALL', 'positivo', 'negativo', 'neutral'].map((imp) => (
          <button
            key={imp}
            className={`filter-pill ${impactoFilter === imp ? 'active' : ''}`}
            onClick={() => setImpactoFilter(imp)}
          >
            {imp === 'ALL' ? 'Todos' : IMPACTO_CONFIG[imp].label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state">Sin noticias para los filtros seleccionados.</div>
      ) : (
        <div className="noticias-list">
          {filtered.map((n) => (
            <NoticiaCard key={n.id} noticia={n} />
          ))}
        </div>
      )}

      <p className="disclaimer-small" style={{ marginTop: '8px' }}>
        Datos de demostración. Fuente real: NewsAPI, RSS CMF, Bloomberg.
      </p>
    </div>
  );
}
