export function formatCLP(value) {
  if (value === null || value === undefined || isNaN(Number(value))) return '$0';
  const num = Math.round(Number(value));
  const abs = Math.abs(num);
  const str = abs.toString();
  const parts = [];
  for (let i = str.length - 1, count = 0; i >= 0; i--, count++) {
    if (count > 0 && count % 3 === 0) parts.unshift('.');
    parts.unshift(str[i]);
  }
  return (num < 0 ? '-$' : '$') + parts.join('');
}

export function formatPercent(value, decimals = 2) {
  if (value === null || value === undefined || isNaN(Number(value))) return '0,00%';
  return Number(value).toFixed(decimals).replace('.', ',') + '%';
}

export function formatNumber(value, decimals = 0) {
  if (value === null || value === undefined || isNaN(Number(value))) return '0';
  return Number(value).toLocaleString('es-CL', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}
