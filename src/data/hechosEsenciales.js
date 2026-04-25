// INTEGRACIÓN FUTURA:
// - CMF API: https://api.cmfchile.cl/api-sbifv3/recursos_api/hecho_esencial
// - Requiere API key CMF y autenticación OAuth2
// - Endpoint real: GET /hecho_esencial?ticker=SQM-B&formato=json

export const HECHOS_ESENCIALES = [
  {
    id: 'he_001',
    ticker: 'SQM-B',
    empresa: 'SQM Sociedad Química y Minera',
    fecha: '2025-04-10',
    titulo: 'SQM anuncia distribución de dividendo provisorio de $812 por acción',
    resumen:
      'El Directorio de SQM acordó distribuir un dividendo provisorio de $812 por acción, con cargo a las utilidades del ejercicio 2024. La fecha de corte será el 22 de abril de 2025 y el pago efectivo el 2 de mayo de 2025.',
    tipo: 'dividendo',
    url: 'https://www.cmfchile.cl/sitio/aplic/serdoc/ver_sgd.php?id=mock_001',
  },
  {
    id: 'he_002',
    ticker: 'CAP',
    empresa: 'CAP S.A.',
    fecha: '2025-03-28',
    titulo: 'CAP S.A. reporta utilidad neta de $78.400 millones en 4T2024',
    resumen:
      'CAP S.A. informa sus resultados del cuarto trimestre 2024. La utilidad neta consolidada alcanzó $78.400 millones, superando en 12% la cifra del mismo período del año anterior. El EBITDA trimestral fue de $134.200 millones.',
    tipo: 'resultado',
    url: 'https://www.cmfchile.cl/sitio/aplic/serdoc/ver_sgd.php?id=mock_002',
  },
  {
    id: 'he_003',
    ticker: 'COPEC',
    empresa: 'Empresas Copec S.A.',
    fecha: '2025-03-20',
    titulo: 'Copec anuncia adquisición de participación en empresa de energías renovables',
    resumen:
      'Empresas Copec S.A. informa la adquisición del 40% de participación en Grenergy Chile S.A., empresa dedicada al desarrollo de proyectos de energía solar y eólica. El monto de la transacción asciende a USD 185 millones.',
    tipo: 'fusión',
    url: 'https://www.cmfchile.cl/sitio/aplic/serdoc/ver_sgd.php?id=mock_003',
  },
  {
    id: 'he_004',
    ticker: 'ENELAM',
    empresa: 'Enel Américas S.A.',
    fecha: '2025-03-15',
    titulo: 'Enel Américas reporta EBITDA de US$3.218 millones en año fiscal 2024',
    resumen:
      'Enel Américas S.A. comunica sus resultados consolidados del año fiscal 2024. El EBITDA alcanzó US$3.218 millones, con un crecimiento del 8,4% respecto al año anterior. La generación de clientes superó los 24 millones en la región.',
    tipo: 'resultado',
    url: 'https://www.cmfchile.cl/sitio/aplic/serdoc/ver_sgd.php?id=mock_004',
  },
  {
    id: 'he_005',
    ticker: 'VAPORES',
    empresa: 'CSAV - Cía. Sud Americana de Vapores',
    fecha: '2025-04-02',
    titulo: 'CSAV anuncia dividendo definitivo de $4,50 por acción',
    resumen:
      'El Directorio de Compañía Sud Americana de Vapores S.A. acordó el pago de un dividendo definitivo de $4,50 por acción con cargo a las utilidades del ejercicio 2024. El pago se realizará el 25 de abril de 2025.',
    tipo: 'dividendo',
    url: 'https://www.cmfchile.cl/sitio/aplic/serdoc/ver_sgd.php?id=mock_005',
  },
  {
    id: 'he_006',
    ticker: 'SQM-B',
    empresa: 'SQM Sociedad Química y Minera',
    fecha: '2025-02-27',
    titulo: 'SQM reporta ingresos de US$1.890 millones en 2024 y ajusta guía 2025',
    resumen:
      'SQM informa sus resultados anuales 2024 con ingresos de US$1.890 millones, una disminución de 18% respecto a 2023 debido a la caída del precio del litio. La empresa ajusta su guía de producción de litio para 2025 a 210.000 toneladas de LCE.',
    tipo: 'resultado',
    url: 'https://www.cmfchile.cl/sitio/aplic/serdoc/ver_sgd.php?id=mock_006',
  },
  {
    id: 'he_007',
    ticker: 'CAP',
    empresa: 'CAP S.A.',
    fecha: '2025-03-05',
    titulo: 'CAP inicia construcción de planta de briquetas de hierro en Huasco',
    resumen:
      'CAP S.A. anuncia el inicio de obras de su nueva planta de briquetas de hierro de reducción directa en el complejo siderúrgico de Huasco. La inversión es de USD 320 millones y la planta tendrá capacidad de producción de 1,2 millones de toneladas anuales.',
    tipo: 'otro',
    url: 'https://www.cmfchile.cl/sitio/aplic/serdoc/ver_sgd.php?id=mock_007',
  },
  {
    id: 'he_008',
    ticker: 'COPEC',
    empresa: 'Empresas Copec S.A.',
    fecha: '2025-04-08',
    titulo: 'Copec distribuye dividendo definitivo por $182 por acción',
    resumen:
      'El Directorio de Empresas Copec S.A. acordó distribuir un dividendo definitivo de $182 por acción con cargo a utilidades del ejercicio terminado el 31 de diciembre de 2024. Fecha de registro: 17 de abril. Pago: 28 de abril de 2025.',
    tipo: 'dividendo',
    url: 'https://www.cmfchile.cl/sitio/aplic/serdoc/ver_sgd.php?id=mock_008',
  },
  {
    id: 'he_009',
    ticker: 'ENELAM',
    empresa: 'Enel Américas S.A.',
    fecha: '2025-02-18',
    titulo: 'Enel Américas designa nuevo Director Independiente en Junta Extraordinaria',
    resumen:
      'Enel Américas S.A. informa que en Junta Extraordinaria de Accionistas se eligió a Rodrigo Vergara M. como nuevo Director Independiente del Directorio. El señor Vergara es economista y ex Presidente del Banco Central de Chile.',
    tipo: 'directorio',
    url: 'https://www.cmfchile.cl/sitio/aplic/serdoc/ver_sgd.php?id=mock_009',
  },
  {
    id: 'he_010',
    ticker: 'VAPORES',
    empresa: 'CSAV - Cía. Sud Americana de Vapores',
    fecha: '2025-03-05',
    titulo: 'CSAV reporta utilidad neta de US$186 millones en ejercicio 2024',
    resumen:
      'Compañía Sud Americana de Vapores S.A. informa sus resultados del ejercicio 2024. La utilidad neta fue de US$186 millones, reflejando la normalización del mercado de contenedores post-pandemia. El resultado de Hapag-Lloyd contribuyó con US$210 millones.',
    tipo: 'resultado',
    url: 'https://www.cmfchile.cl/sitio/aplic/serdoc/ver_sgd.php?id=mock_010',
  },
];

export const TIPO_HECHO_CONFIG = {
  dividendo:  { label: 'Dividendo',  color: 'var(--green)',  bg: 'rgba(0,212,170,0.12)' },
  resultado:  { label: 'Resultado',  color: 'var(--blue)',   bg: 'rgba(59,130,246,0.12)' },
  'fusión':   { label: 'Fusión/Adq', color: 'var(--yellow)', bg: 'rgba(245,158,11,0.12)' },
  directorio: { label: 'Directorio', color: 'var(--teal)',   bg: 'rgba(6,182,212,0.12)'  },
  otro:       { label: 'Otro',       color: 'var(--text-2)', bg: 'rgba(148,163,184,0.12)' },
};
