export function calcularTotalCartera(portfolio) {
  return portfolio.reduce((sum, a) => sum + a.cantidad * a.precioActual, 0);
}

export function calcularMetricasAccion(accion, totalCartera) {
  const valorInvertido = accion.cantidad * accion.precioActual;
  const costoHistorico = accion.cantidad * accion.precioPromedio;
  const dividendoAnualBruto = valorInvertido * (accion.dividendYield / 100);
  const dividendoMensual = dividendoAnualBruto / 12;
  const yieldOnCost = costoHistorico > 0 ? (dividendoAnualBruto / costoHistorico) * 100 : 0;
  const rentabilidad =
    accion.precioPromedio > 0
      ? ((accion.precioActual - accion.precioPromedio) / accion.precioPromedio) * 100
      : 0;
  const pesoCartera = totalCartera > 0 ? (valorInvertido / totalCartera) * 100 : 0;

  return {
    valorInvertido,
    costoHistorico,
    dividendoAnualBruto,
    dividendoMensual,
    yieldOnCost,
    rentabilidad,
    pesoCartera,
  };
}

export function calcularResumenCartera(portfolio, tasaImpuesto) {
  if (!portfolio || portfolio.length === 0) {
    return {
      totalCartera: 0,
      dividendosAnualesBrutos: 0,
      dividendosMensuales: 0,
      yieldPromedio: 0,
      impuestoEstimado: 0,
      dividendosNetos: 0,
      dividendosNetosMensuales: 0,
    };
  }

  const totalCartera = calcularTotalCartera(portfolio);
  const dividendosAnualesBrutos = portfolio.reduce(
    (sum, a) => sum + a.cantidad * a.precioActual * (a.dividendYield / 100),
    0
  );
  const dividendosMensuales = dividendosAnualesBrutos / 12;
  const yieldPromedio = totalCartera > 0 ? (dividendosAnualesBrutos / totalCartera) * 100 : 0;
  const impuestoEstimado = dividendosAnualesBrutos * (tasaImpuesto / 100);
  const dividendosNetos = dividendosAnualesBrutos - impuestoEstimado;
  const dividendosNetosMensuales = dividendosNetos / 12;

  return {
    totalCartera,
    dividendosAnualesBrutos,
    dividendosMensuales,
    yieldPromedio,
    impuestoEstimado,
    dividendosNetos,
    dividendosNetosMensuales,
  };
}

export function calcularProyeccion(portfolio, tasaImpuesto, aporteMensual, reinvertir, anos = 20) {
  if (!portfolio || portfolio.length === 0) return [];

  const resumenBase = calcularResumenCartera(portfolio, tasaImpuesto);
  const yieldDecimal = resumenBase.yieldPromedio / 100;
  const tasaImpuestoDecimal = tasaImpuesto / 100;
  const totalBase = resumenBase.totalCartera;

  const crecimientoPromedio =
    totalBase > 0
      ? portfolio.reduce(
          (sum, a) => sum + (a.cantidad * a.precioActual * (a.crecimientoEsperado / 100)),
          0
        ) / totalBase
      : 0.04;

  let valorCartera = totalBase;
  const resultado = [];

  for (let year = 1; year <= anos; year++) {
    valorCartera = valorCartera * (1 + crecimientoPromedio);
    valorCartera += aporteMensual * 12;

    const dividendosBrutos = valorCartera * yieldDecimal;
    const impuesto = dividendosBrutos * tasaImpuestoDecimal;
    const dividendosNetos = dividendosBrutos - impuesto;

    if (reinvertir) {
      valorCartera += dividendosNetos;
    }

    resultado.push({
      year,
      valorCartera: Math.round(valorCartera),
      dividendosBrutos: Math.round(dividendosBrutos),
      dividendosNetos: Math.round(dividendosNetos),
      dividendosMensualesNetos: Math.round(dividendosNetos / 12),
    });
  }

  return resultado;
}

export function calcularMeta(resumen, goals) {
  const { metaMensual, anos } = goals;
  const { dividendosNetosMensuales, yieldPromedio, totalCartera } = resumen;

  const alcanzaMeta = dividendosNetosMensuales >= metaMensual;
  const brechaMensual = Math.max(0, metaMensual - dividendosNetosMensuales);

  const yieldDecimal = yieldPromedio / 100;
  const capitalNecesario = yieldDecimal > 0 ? (metaMensual * 12) / yieldDecimal : 0;
  const capitalFaltante = Math.max(0, capitalNecesario - totalCartera);
  const aporteMensualNecesario = anos > 0 ? capitalFaltante / (anos * 12) : 0;

  return {
    alcanzaMeta,
    brechaMensual,
    capitalNecesario,
    capitalFaltante,
    aporteMensualNecesario,
  };
}

export function calcularAlertas(portfolio, resumen, goals) {
  const alertas = [];
  const { totalCartera } = resumen;

  if (!portfolio || portfolio.length === 0) return alertas;

  portfolio.forEach((accion) => {
    const valor = accion.cantidad * accion.precioActual;
    const peso = totalCartera > 0 ? (valor / totalCartera) * 100 : 0;
    if (peso > 30) {
      alertas.push({
        tipo: 'warning',
        mensaje: `${accion.ticker} representa el ${peso.toFixed(1)}% de tu cartera (límite recomendado: 30%). Alta concentración.`,
      });
    }
  });

  portfolio.forEach((accion) => {
    if (accion.dividendYield > 8) {
      alertas.push({
        tipo: 'warning',
        mensaje: `${accion.ticker} tiene un yield de ${accion.dividendYield}%. Yields muy altos pueden indicar dividendo no sostenible.`,
      });
    }
  });

  portfolio.forEach((accion) => {
    if (accion.precioPromedio > 0) {
      const rent = ((accion.precioActual - accion.precioPromedio) / accion.precioPromedio) * 100;
      if (rent < -20) {
        alertas.push({
          tipo: 'danger',
          mensaje: `${accion.ticker} acumula una caída de ${rent.toFixed(1)}% desde tu precio promedio de compra.`,
        });
      }
    }
  });

  const sectores = {};
  portfolio.forEach((accion) => {
    const valor = accion.cantidad * accion.precioActual;
    sectores[accion.sector] = (sectores[accion.sector] || 0) + valor;
  });
  Object.entries(sectores).forEach(([sector, valor]) => {
    const peso = totalCartera > 0 ? (valor / totalCartera) * 100 : 0;
    if (peso > 50) {
      alertas.push({
        tipo: 'warning',
        mensaje: `El sector "${sector}" representa el ${peso.toFixed(1)}% de tu cartera. Considera diversificar entre sectores.`,
      });
    }
  });

  if (goals.metaMensual > 0 && resumen.dividendosNetosMensuales < goals.metaMensual) {
    const brecha = goals.metaMensual - resumen.dividendosNetosMensuales;
    const brechaFmt = Math.round(brecha).toLocaleString('es-CL');
    alertas.push({
      tipo: 'info',
      mensaje: `Tus dividendos mensuales netos están $${brechaFmt} por debajo de tu meta de ingreso pasivo.`,
    });
  }

  return alertas;
}
