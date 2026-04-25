export function evaluarAlertasPersonalizadas(configAlertas, stocks) {
  const activas = [];

  configAlertas.forEach((alerta) => {
    const targets =
      alerta.ticker === 'ALL'
        ? stocks
        : stocks.filter((s) => s.ticker === alerta.ticker);

    targets.forEach((stock) => {
      if (alerta.tipo === 'yield_mayor' && stock.dividendYield > alerta.valor) {
        activas.push({
          alertaId: alerta.id,
          ticker: stock.ticker,
          nombre: stock.nombre,
          mensaje: `${stock.ticker} (${stock.sector}): yield ${stock.dividendYield.toFixed(1)}% supera el umbral de ${alerta.valor}%`,
          tipo: 'warning',
          valorActual: stock.dividendYield,
          umbral: alerta.valor,
        });
      }

      if (alerta.tipo === 'precio_menor' && stock.price < alerta.valor) {
        activas.push({
          alertaId: alerta.id,
          ticker: stock.ticker,
          nombre: stock.nombre,
          mensaje: `${stock.ticker} (${stock.sector}): precio $${stock.price.toLocaleString('es-CL')} por debajo de $${alerta.valor.toLocaleString('es-CL')}`,
          tipo: 'info',
          valorActual: stock.price,
          umbral: alerta.valor,
        });
      }
    });
  });

  return activas;
}
