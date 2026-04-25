// INTEGRACIÓN FUTURA:
// - NewsAPI: https://newsapi.org/docs/ (noticias globales en inglés)
// - CMF RSS: https://www.cmfchile.cl/rss/ (noticias mercado chileno)
// - Google News RSS por término de búsqueda (cobre, litio, IPSA)
// - Scraping con puppeteer o Apify para fuentes locales (DF, El Mercurio)

export const NOTICIAS = [
  // ── GEOPOLÍTICA ──────────────────────────────────────────────
  {
    id: 'n_001',
    titulo: 'Tensiones EE.UU.-China escalan y presionan a la baja los metales industriales',
    resumen:
      'Nuevos aranceles del 25% anunciados por Washington a importaciones chinas de semiconductores y minerales estratégicos generan incertidumbre en los mercados de materias primas. El cobre y el litio lideran las caídas en los mercados de futuros.',
    categoria: 'geopolitica',
    fecha: '2025-04-22',
    fuente: 'Reuters',
    impacto: 'negativo',
  },
  {
    id: 'n_002',
    titulo: 'Elecciones en Chile: candidatos presidenciales presentan propuestas para sector minero',
    resumen:
      'Con miras a las elecciones de noviembre, los principales candidatos presidenciales dan a conocer sus programas para la gran minería. Las propuestas incluyen desde aumentos al royalty minero hasta incentivos para la transición energética del sector.',
    categoria: 'geopolitica',
    fecha: '2025-04-18',
    fuente: 'Diario Financiero',
    impacto: 'neutral',
  },
  {
    id: 'n_003',
    titulo: 'Conflicto en Oriente Medio eleva precio del petróleo Brent a máximos de 6 meses',
    resumen:
      'La escalada de tensiones en el Mar Rojo interrumpe el tránsito de buques cisterna, empujando el Brent a USD 94 por barril. El impacto en los costos operacionales de empresas chilenas con flota naviera podría ser significativo en el corto plazo.',
    categoria: 'geopolitica',
    fecha: '2025-04-15',
    fuente: 'Bloomberg',
    impacto: 'negativo',
  },
  {
    id: 'n_004',
    titulo: 'UE y Chile cierran acuerdo para asegurar suministro preferencial de litio hasta 2035',
    resumen:
      'La Unión Europea y el Gobierno de Chile firman un memorando de entendimiento que garantiza acceso preferencial al litio chileno para la industria de baterías europea a cambio de transferencia tecnológica y financiamiento verde para proyectos locales.',
    categoria: 'geopolitica',
    fecha: '2025-04-10',
    fuente: 'El Mercurio',
    impacto: 'positivo',
  },
  {
    id: 'n_005',
    titulo: 'G7 acuerda restricciones a exportaciones de tecnología crítica hacia economías emergentes',
    resumen:
      'Los países del G7 acordaron nuevas restricciones en exportación de tecnología de semiconductores y equipos de energía renovable. La medida podría retrasar proyectos de modernización industrial en Chile e impactar la competitividad del sector exportador.',
    categoria: 'geopolitica',
    fecha: '2025-04-05',
    fuente: 'Financial Times',
    impacto: 'negativo',
  },

  // ── COMMODITIES ──────────────────────────────────────────────
  {
    id: 'n_006',
    titulo: 'Cobre supera USD 4,80/lb impulsado por demanda de vehículos eléctricos en China',
    resumen:
      'El precio del cobre en la Bolsa de Metales de Londres alcanzó USD 4,80 por libra, nivel no visto en 18 meses. La aceleración de la electrificación del parque automotriz chino, que superó el 40% en ventas de EV, es el principal motor de la demanda.',
    categoria: 'commodities',
    fecha: '2025-04-23',
    fuente: 'LME / Reuters',
    impacto: 'positivo',
  },
  {
    id: 'n_007',
    titulo: 'Litio cae 18% en el año ante exceso de oferta por nuevos proyectos en Argentina',
    resumen:
      'El carbonato de litio de grado batería cotiza en USD 11.200/t, acumulando una caída de 18% en lo que va de 2025. El ingreso de nueva oferta de proyectos en el Triángulo del Litio (Argentina-Bolivia-Chile) supera la demanda proyectada para el ejercicio.',
    categoria: 'commodities',
    fecha: '2025-04-20',
    fuente: 'Fastmarkets',
    impacto: 'negativo',
  },
  {
    id: 'n_008',
    titulo: 'Petróleo WTI supera USD 88 por barril ante recortes de producción de la OPEP+',
    resumen:
      'La OPEP+ extiende los recortes de producción hasta septiembre 2025. El WTI supera los USD 88, nivel que presiona los costos operacionales de empresas energo-intensivas y de transporte en Chile. Copec y ENAP ajustan precios de combustibles.',
    categoria: 'commodities',
    fecha: '2025-04-17',
    fuente: 'OPEC / Bloomberg',
    impacto: 'negativo',
  },
  {
    id: 'n_009',
    titulo: 'Celulosa BHKP sube 8% en Asia tras sequías en zonas forestales de Europa del Norte',
    resumen:
      'Las sequías en Finlandia y Suecia reducen la producción local de celulosa, impulsando los precios de BHKP en Asia a USD 680/t. CMPC y Arauco son las principales beneficiadas del sector forestal chileno ante este repunte en el precio de referencia.',
    categoria: 'commodities',
    fecha: '2025-04-12',
    fuente: 'Fastmarkets RISI',
    impacto: 'positivo',
  },
  {
    id: 'n_010',
    titulo: 'Hierro recupera USD 110/t tras paquete de estímulo fiscal de China por USD 500 billones',
    resumen:
      'Beijing anuncia un paquete de estímulo fiscal enfocado en infraestructura y vivienda. El precio del mineral de hierro 62% Fe rebota a USD 110/t desde los mínimos de USD 95/t registrados en febrero. CAP, principal productor chileno de hierro, es la acción más beneficiada.',
    categoria: 'commodities',
    fecha: '2025-04-08',
    fuente: 'Metal Bulletin',
    impacto: 'positivo',
  },

  // ── MERCADO CHILE ─────────────────────────────────────────────
  {
    id: 'n_011',
    titulo: 'IPSA sube 2,3% en la semana impulsado por sector bancario y minería del cobre',
    resumen:
      'El Índice de Precios Selectivo de Acciones (IPSA) cierra la semana con un alza de 2,3%, liderado por Banco de Chile (+3,1%), BCI (+2,8%) y CAP (+4,2%). El volumen operado alcanzó CLP 48.200 millones, 35% sobre el promedio de las últimas cuatro semanas.',
    categoria: 'mercado_chile',
    fecha: '2025-04-25',
    fuente: 'Bolsa de Santiago',
    impacto: 'positivo',
  },
  {
    id: 'n_012',
    titulo: 'Dólar cae a $848 por fortaleza del cobre y menor demanda por divisas',
    resumen:
      'El tipo de cambio peso/dólar retrocede a $848, su nivel más bajo desde octubre 2024. El alza del cobre y un Banco Central con postura neutral sobre tasas son los principales factores. Los importadores aumentan cobertura cambiaria ante expectativa de mayor apreciación del peso.',
    categoria: 'mercado_chile',
    fecha: '2025-04-24',
    fuente: 'Banco Central de Chile',
    impacto: 'neutral',
  },
  {
    id: 'n_013',
    titulo: 'IPC de marzo anota 0,4%, acumulando 3,8% en 12 meses, en línea con meta del BCCh',
    resumen:
      'El Índice de Precios al Consumidor de marzo registró un alza mensual de 0,4%, dejando la inflación anualizada en 3,8%, dentro del rango de tolerancia del Banco Central. La variación fue liderada por alimentos y combustibles; la inflación subyacente se mantiene en 3,2%.',
    categoria: 'mercado_chile',
    fecha: '2025-04-09',
    fuente: 'INE Chile',
    impacto: 'neutral',
  },
  {
    id: 'n_014',
    titulo: 'BCI reporta utilidad récord de $215.000 millones en el primer trimestre 2025',
    resumen:
      'Banco de Crédito e Inversiones reportó una utilidad neta de $215.000 millones en 1T2025, un 22% por sobre el mismo período del año anterior. El margen neto de intereses se expandió gracias a la menor presión de tasas pasivas, mientras la cartera de créditos comerciales creció 8,4%.',
    categoria: 'mercado_chile',
    fecha: '2025-04-22',
    fuente: 'BCI / CMF',
    impacto: 'positivo',
  },
  {
    id: 'n_015',
    titulo: 'AFP invierten USD 2.100 millones en renta variable local en el primer trimestre',
    resumen:
      'Las Administradoras de Fondos de Pensiones aumentaron su exposición a renta variable nacional en USD 2.100 millones durante el primer trimestre de 2025. Los fondos más activos son el C y D, favoreciendo sectores energético y bancario ante perspectivas de recortes de tasas del BCCh.',
    categoria: 'mercado_chile',
    fecha: '2025-04-16',
    fuente: 'Superintendencia de Pensiones',
    impacto: 'positivo',
  },
];

export const CATEGORIA_CONFIG = {
  geopolitica:    { label: 'Geopolítica',     icon: '🌍' },
  commodities:    { label: 'Commodities',     icon: '🪨' },
  mercado_chile:  { label: 'Mercado Chile',   icon: '🇨🇱' },
};

export const IMPACTO_CONFIG = {
  positivo: { label: 'Positivo', color: 'var(--green)',  bg: 'rgba(0,212,170,0.12)' },
  negativo: { label: 'Negativo', color: 'var(--red)',    bg: 'rgba(239,68,68,0.12)' },
  neutral:  { label: 'Neutral',  color: 'var(--text-2)', bg: 'rgba(148,163,184,0.1)' },
};
