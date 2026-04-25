// INTEGRACIÓN FUTURA:
// - Stripe: https://stripe.com/docs/api (suscripciones y pagos)
// - Supabase Auth: https://supabase.com/docs/guides/auth (usuarios y sesiones)
// El localStorage aquí simula la sesión/plan del usuario

import { useState } from 'react';

export const PLAN_FREE = {
  id: 'free',
  nombre: 'Free',
  tabs: ['dashboard', 'cartera', 'oportunidades', 'alertas', 'metas', 'proyeccion', 'rankings'],
};

export const PLAN_PRO = {
  id: 'pro',
  nombre: 'PRO',
  tabs: ['all'],
};

export function usePlan() {
  const [isPro, setIsPro] = useState(
    () => localStorage.getItem('r100_plan') === 'pro'
  );

  const togglePro = () => {
    setIsPro((prev) => {
      const next = !prev;
      localStorage.setItem('r100_plan', next ? 'pro' : 'free');
      return next;
    });
  };

  const activatePro = () => {
    setIsPro(true);
    localStorage.setItem('r100_plan', 'pro');
  };

  return { isPro, togglePro, activatePro };
}
