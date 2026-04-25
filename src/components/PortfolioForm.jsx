import { useState, useEffect } from 'react';
import { CHILEAN_STOCKS } from '../data/chileanStocks';

const EMPTY = {
  ticker: '',
  nombre: '',
  sector: '',
  cantidad: '',
  precioPromedio: '',
  precioActual: '',
  dividendYield: '',
  crecimientoEsperado: '',
};

export default function PortfolioForm({ onAdd, onEdit, editingItem, onCancelEdit }) {
  const [form, setForm] = useState(EMPTY);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    if (editingItem) {
      setForm({
        ticker: editingItem.ticker ?? '',
        nombre: editingItem.nombre ?? '',
        sector: editingItem.sector ?? '',
        cantidad: editingItem.cantidad?.toString() ?? '',
        precioPromedio: editingItem.precioPromedio?.toString() ?? '',
        precioActual: editingItem.precioActual?.toString() ?? '',
        dividendYield: editingItem.dividendYield?.toString() ?? '',
        crecimientoEsperado: editingItem.crecimientoEsperado?.toString() ?? '',
      });
    } else {
      setForm(EMPTY);
    }
  }, [editingItem]);

  const filteredStocks = form.ticker.length > 0
    ? CHILEAN_STOCKS.filter(
        (s) =>
          s.ticker.toLowerCase().includes(form.ticker.toLowerCase()) ||
          s.nombre.toLowerCase().includes(form.ticker.toLowerCase())
      ).slice(0, 7)
    : CHILEAN_STOCKS.slice(0, 7);

  const handleTickerChange = (e) => {
    setForm((prev) => ({ ...prev, ticker: e.target.value.toUpperCase() }));
    setShowSuggestions(true);
  };

  const handleSelectStock = (stock) => {
    setForm((prev) => ({
      ...prev,
      ticker: stock.ticker,
      nombre: stock.nombre,
      sector: stock.sector,
      precioActual: stock.precioActual.toString(),
      dividendYield: stock.dividendYield.toString(),
      crecimientoEsperado: stock.crecimientoEsperado.toString(),
    }));
    setShowSuggestions(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const item = {
      ticker: form.ticker.toUpperCase().trim(),
      nombre: form.nombre.trim(),
      sector: form.sector.trim(),
      cantidad: parseFloat(form.cantidad) || 0,
      precioPromedio: parseFloat(form.precioPromedio) || 0,
      precioActual: parseFloat(form.precioActual) || 0,
      dividendYield: parseFloat(form.dividendYield) || 0,
      crecimientoEsperado: parseFloat(form.crecimientoEsperado) || 0,
    };
    if (!item.ticker || item.cantidad <= 0) return;

    if (editingItem) {
      onEdit(editingItem.id, item);
    } else {
      onAdd(item);
    }
    setForm(EMPTY);
  };

  return (
    <div className="panel-section">
      <h3 className="section-title">
        {editingItem ? `Editando: ${editingItem.ticker}` : 'Agregar acción'}
      </h3>

      <form onSubmit={handleSubmit} className="portfolio-form">
        <div className="form-group autocomplete-wrap">
          <label>Ticker</label>
          <input
            type="text"
            name="ticker"
            value={form.ticker}
            onChange={handleTickerChange}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 180)}
            placeholder="Ej: CHILE, SQM-B…"
            className="input"
            required
            autoComplete="off"
          />
          {showSuggestions && filteredStocks.length > 0 && (
            <div className="suggestions">
              {filteredStocks.map((s) => (
                <button
                  key={s.ticker}
                  type="button"
                  className="suggestion-item"
                  onMouseDown={() => handleSelectStock(s)}
                >
                  <span className="suggestion-ticker">{s.ticker}</span>
                  <span className="suggestion-name">{s.nombre}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="form-group">
          <label>Nombre empresa</label>
          <input
            type="text"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            placeholder="Nombre completo"
            className="input"
          />
        </div>

        <div className="form-group">
          <label>Sector</label>
          <input
            type="text"
            name="sector"
            value={form.sector}
            onChange={handleChange}
            placeholder="Ej: Bancario, Energía…"
            className="input"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Cantidad acciones</label>
            <input
              type="number"
              name="cantidad"
              value={form.cantidad}
              onChange={handleChange}
              placeholder="0"
              min="0"
              className="input"
              required
            />
          </div>
          <div className="form-group">
            <label>Precio promedio ($)</label>
            <input
              type="number"
              name="precioPromedio"
              value={form.precioPromedio}
              onChange={handleChange}
              placeholder="0"
              min="0"
              className="input"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Precio actual ($)</label>
            <input
              type="number"
              name="precioActual"
              value={form.precioActual}
              onChange={handleChange}
              placeholder="0"
              min="0"
              className="input"
            />
          </div>
          <div className="form-group">
            <label>Dividend Yield (%)</label>
            <input
              type="number"
              name="dividendYield"
              value={form.dividendYield}
              onChange={handleChange}
              placeholder="0,0"
              min="0"
              step="0.1"
              className="input"
            />
          </div>
        </div>

        <div className="form-group">
          <label>Crecimiento esperado (%/año)</label>
          <input
            type="number"
            name="crecimientoEsperado"
            value={form.crecimientoEsperado}
            onChange={handleChange}
            placeholder="0,0"
            min="0"
            step="0.1"
            className="input"
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary btn-full">
            {editingItem ? 'Guardar cambios' : '+ Agregar acción'}
          </button>
          {editingItem && (
            <button type="button" onClick={onCancelEdit} className="btn btn-ghost btn-full">
              Cancelar edición
            </button>
          )}
        </div>
      </form>

      <p className="disclaimer-small">
        Datos referenciales para simulación. No constituyen recomendación de inversión.
      </p>
    </div>
  );
}
