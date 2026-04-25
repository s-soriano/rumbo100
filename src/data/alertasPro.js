// INTEGRACIÓN FUTURA:
// - Supabase: guardar alertas en base de datos por usuario autenticado
// - SendGrid/Resend: disparar emails reales cuando condición se cumple
// - WebSockets o polling: evaluar condiciones en tiempo real contra API de precios

const LS_KEY = 'r100_alertas_pro';

const DEFAULT_STATE = {
  precioAlertas: [],
  heSubscriptions: [],
};

export function loadAlertasPro() {
  try {
    const v = localStorage.getItem(LS_KEY);
    return v ? { ...DEFAULT_STATE, ...JSON.parse(v) } : DEFAULT_STATE;
  } catch {
    return DEFAULT_STATE;
  }
}

export function saveAlertasPro(data) {
  localStorage.setItem(LS_KEY, JSON.stringify(data));
}

export const CONDICION_LABELS = {
  above: 'Mayor que',
  below: 'Menor que',
};

export const TIPOS_HE = ['dividendo', 'resultado', 'fusión', 'directorio', 'otro'];
