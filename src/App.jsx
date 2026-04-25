// INTEGRACIÓN FUTURA:
// - Stripe: https://stripe.com/docs/api (pagos de suscripción PRO)
// - Supabase Auth: https://supabase.com/docs/guides/auth (autenticación real)
// - CMF API: https://api.cmfchile.cl/api-sbifv3/recursos_api/ (datos reales)

import { useState, useEffect, useRef } from 'react';
import Dashboard from './components/Dashboard';
import PortfolioForm from './components/PortfolioForm';
import PortfolioTable from './components/PortfolioTable';
import Alerts from './components/Alerts';
import Goals from './components/Goals';
import ProjectionTable from './components/ProjectionTable';
import Rankings from './components/Rankings';
import Oportunidades from './components/Oportunidades';
import HechosEsenciales from './components/HechosEsenciales';
import AlertasPro from './components/AlertasPro';
import Noticias from './components/Noticias';
import ProBadge from './components/ProBadge';
import {
  calcularResumenCartera,
  calcularAlertas,
} from './utils/calculations';
import { evaluarAlertasPersonalizadas } from './utils/alertEngine';
import { CHILE_STOCKS } from './data/chileStocks';
import { usePlan } from './config/plans';
import { formatCLP, formatPercent } from './utils/formatters';
import './App.css';

const DEFAULT_GOALS = {
  metaMensual: 500000,
  anos: 10,
  aporteMensual: 200000,
  reinvertir: true,
};

const TABS = [
  { id: 'dashboard',    label: 'Dashboard'   },
  { id: 'cartera',      label: 'Cartera'     },
  { id: 'oportunidades',label: 'Oportunidades'},
  { id: 'alertas',      label: 'Alertas'     },
  { id: 'alertas_pro',  label: 'Alertas Pro', pro: true },
  { id: 'hechos',       label: 'Hechos',      pro: true },
  { id: 'noticias',     label: 'Noticias',    pro: true },
  { id: 'metas',        label: 'Metas'       },
  { id: 'proyeccion',   label: 'Proyección'  },
  { id: 'rankings',     label: 'Rankings'    },
];

function loadLS(key, fallback) {
  try {
    const v = localStorage.getItem(key);
    return v !== null ? JSON.parse(v) : fallback;
  } catch {
    return fallback;
  }
}

export default function App() {
  const { isPro, activatePro, togglePro } = usePlan();

  const [portfolio, setPortfolio]       = useState(() => loadLS('r100_portfolio', []));
  const [taxRate, setTaxRate]           = useState(() => {
    const v = localStorage.getItem('r100_taxrate');
    return v !== null ? parseFloat(v) : 10;
  });
  const [goals, setGoals]               = useState(() => loadLS('r100_goals', DEFAULT_GOALS));
  const [configAlertas, setConfigAlertas] = useState(() => loadLS('r100_alertas_config', []));
  const [activeTab, setActiveTab]       = useState('dashboard');
  const [editingItem, setEditingItem]   = useState(null);
  const importRef = useRef(null);

  useEffect(() => { localStorage.setItem('r100_portfolio',     JSON.stringify(portfolio));    }, [portfolio]);
  useEffect(() => { localStorage.setItem('r100_taxrate',       String(taxRate));              }, [taxRate]);
  useEffect(() => { localStorage.setItem('r100_goals',         JSON.stringify(goals));        }, [goals]);
  useEffect(() => { localStorage.setItem('r100_alertas_config',JSON.stringify(configAlertas));}, [configAlertas]);

  const resumen              = calcularResumenCartera(portfolio, taxRate);
  const alertas              = calcularAlertas(portfolio, resumen, goals);
  const alertasPersonalizadas = evaluarAlertasPersonalizadas(configAlertas, CHILE_STOCKS);
  const totalBadge           = alertas.length + alertasPersonalizadas.length;

  const handleAdd    = (item) => setPortfolio((p) => [...p, { ...item, id: Date.now().toString() }]);
  const handleEdit   = (id, item) => { setPortfolio((p) => p.map((a) => (a.id === id ? { ...item, id } : a))); setEditingItem(null); };
  const handleDelete = (id)  => setPortfolio((p) => p.filter((a) => a.id !== id));

  const handleAddAlerta    = (alerta) => setConfigAlertas((p) => [...p, { ...alerta, id: Date.now().toString(), creadaEl: Date.now() }]);
  const handleDeleteAlerta = (id)     => setConfigAlertas((p) => p.filter((a) => a.id !== id));

  const handleExport = () => {
    const blob = new Blob([JSON.stringify({ portfolio, taxRate, goals }, null, 2)], { type: 'application/json' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href = url; a.download = `rumbo100_cartera_${new Date().toISOString().slice(0, 10)}.json`; a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e) => {
    const file = e.target.files[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const data = JSON.parse(ev.target.result);
        if (Array.isArray(data.portfolio)) setPortfolio(data.portfolio);
        if (typeof data.taxRate === 'number') setTaxRate(data.taxRate);
        if (data.goals) setGoals(data.goals);
        alert('Cartera importada correctamente.');
      } catch { alert('Error: JSON inválido o formato incorrecto.'); }
    };
    reader.readAsText(file); e.target.value = '';
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-inner">
          <div className="header-brand">
            <span className="brand-icon">📈</span>
            <div>
              <h1 className="brand-title">Rumbo100 Dividendos Chile</h1>
              <p className="brand-sub">
                Simula, proyecta y ordena tus ingresos por dividendos en acciones chilenas
              </p>
            </div>
          </div>

          <div className="header-kpis">
            <div className="kpi">
              <span className="kpi-label">Cartera total</span>
              <span className="kpi-value">{formatCLP(resumen.totalCartera)}</span>
            </div>
            <div className="kpi">
              <span className="kpi-label">Yield promedio</span>
              <span className="kpi-value col-teal">{formatPercent(resumen.yieldPromedio)}</span>
            </div>
            <div className="kpi">
              <span className="kpi-label">Dividendos netos/mes</span>
              <span className="kpi-value col-green">{formatCLP(resumen.dividendosNetosMensuales)}</span>
            </div>
          </div>

          <div className="header-plan">
            {isPro ? (
              <>
                <ProBadge />
                <button className="btn btn-ghost plan-toggle-btn" onClick={togglePro} title="Volver a Free">
                  ✓ PRO activo
                </button>
              </>
            ) : (
              <>
                <span className="free-badge">FREE</span>
                <button className="upgrade-btn" onClick={activatePro}>
                  ⭐ Upgrade a PRO
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      <div className="app-body">
        <aside className="left-panel">
          <PortfolioForm
            onAdd={handleAdd}
            onEdit={handleEdit}
            editingItem={editingItem}
            onCancelEdit={() => setEditingItem(null)}
          />

          <div className="panel-section">
            <h3 className="section-title">Configuración fiscal</h3>
            <div className="setting-row">
              <span className="setting-label">Tasa impuesto dividendos</span>
              <div className="setting-control">
                <input
                  type="number" value={taxRate} min="0" max="50" step="0.5"
                  onChange={(e) => setTaxRate(parseFloat(e.target.value) || 0)}
                  className="input-xs"
                />
                <span className="setting-unit">%</span>
              </div>
            </div>
            <p className="disclaimer-small">
              Estimación simplificada. Para declaración real revisar normativa tributaria vigente.
            </p>
          </div>

          <div className="panel-section">
            <h3 className="section-title">Importar / Exportar</h3>
            <button onClick={handleExport} className="btn btn-secondary btn-full">⬇ Exportar cartera JSON</button>
            <label className="btn btn-outline btn-full">
              ⬆ Importar cartera JSON
              <input ref={importRef} type="file" accept=".json" onChange={handleImport} style={{ display: 'none' }} />
            </label>
          </div>
        </aside>

        <main className="right-panel">
          <nav className="tab-nav">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                className={`tab-btn ${activeTab === tab.id ? 'tab-active' : ''} ${tab.pro ? 'tab-pro' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
                {tab.pro && <span className="tab-pro-star">⭐</span>}
                {tab.id === 'alertas' && totalBadge > 0 && (
                  <span className="tab-badge">{totalBadge}</span>
                )}
              </button>
            ))}
          </nav>

          <div className="tab-content">
            {activeTab === 'dashboard'     && <Dashboard resumen={resumen} />}
            {activeTab === 'cartera'       && (
              <PortfolioTable portfolio={portfolio} onEdit={(a) => setEditingItem(a)} onDelete={handleDelete} />
            )}
            {activeTab === 'oportunidades' && <Oportunidades />}
            {activeTab === 'alertas'       && (
              <Alerts
                alertas={alertas}
                configAlertas={configAlertas}
                alertasPersonalizadas={alertasPersonalizadas}
                onAddAlerta={handleAddAlerta}
                onDeleteAlerta={handleDeleteAlerta}
              />
            )}
            {activeTab === 'alertas_pro'   && <AlertasPro   isPro={isPro} onUpgrade={activatePro} />}
            {activeTab === 'hechos'        && <HechosEsenciales isPro={isPro} onUpgrade={activatePro} />}
            {activeTab === 'noticias'      && <Noticias     isPro={isPro} onUpgrade={activatePro} />}
            {activeTab === 'metas'         && <Goals resumen={resumen} goals={goals} onGoalsChange={setGoals} />}
            {activeTab === 'proyeccion'    && <ProjectionTable portfolio={portfolio} taxRate={taxRate} goals={goals} />}
            {activeTab === 'rankings'      && <Rankings portfolio={portfolio} />}
          </div>
        </main>
      </div>
    </div>
  );
}
