export interface BlogPost {
  slug: string;
  category: string;
  categoryColor: string;
  emoji: string;
  title: string;
  excerpt: string;
  readTime: string;
  publishedAt: string;
  content: BlogBlock[];
}

export type BlogBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "tip"; text: string };

export const blogPosts: BlogPost[] = [
  {
    slug: "senales-electricista-urgente",
    category: "Electricidad",
    categoryColor: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
    emoji: "⚡",
    title: "5 señales de que necesitás llamar a un electricista urgente",
    excerpt:
      "Los problemas eléctricos pueden ser peligrosos. Conocé las señales de alerta antes de que sea demasiado tarde.",
    readTime: "3 min",
    publishedAt: "2025-11-10",
    content: [
      {
        type: "p",
        text: "Los problemas eléctricos en el hogar no siempre avisan con tiempo. Algunos empiezan siendo pequeñas molestias y terminan siendo riesgos reales de incendio o electrocución. Saber reconocerlos a tiempo puede hacer una gran diferencia.",
      },
      { type: "h2", text: "1. Los disyuntores se disparan seguido" },
      {
        type: "p",
        text: "Un disyuntor que se dispara de vez en cuando es normal. Uno que se dispara frecuentemente, especialmente en el mismo circuito, es señal de que hay sobrecarga o un cortocircuito que hay que investigar.",
      },
      { type: "h2", text: "2. Las luces parpadean o tienen variaciones de intensidad" },
      {
        type: "p",
        text: "Si las luces de tu casa parpadean o se ven más brillantes o tenues en distintos momentos del día, puede ser una señal de conexiones flojas o problemas en el tablero principal.",
      },
      { type: "h2", text: "3. Enchufes o interruptores tibios al tacto" },
      {
        type: "p",
        text: "Un enchufe o interruptor nunca debería estar caliente. Si sentís calor al tocarlo, es una señal de que algo está mal en el cableado o en el dispositivo conectado. No lo ignorés.",
      },
      { type: "h2", text: "4. Olor a quemado sin origen claro" },
      {
        type: "p",
        text: "Un olor a plástico quemado o a cables es una señal de alarma inmediata. Si no encontrás el origen en ningún electrodoméstico encendido, puede ser el cableado dentro de las paredes. Apagá el tablero y llamá a un electricista.",
      },
      { type: "h2", text: "5. La instalación tiene más de 20 años" },
      {
        type: "p",
        text: "Una instalación eléctrica envejecida puede no cumplir con las exigencias actuales de los hogares modernos, llenos de dispositivos de alto consumo. Una revisión preventiva puede evitar problemas graves.",
      },
      {
        type: "tip",
        text: "Ante cualquier duda, no esperes. Llamar a un electricista matriculado para una revisión es mucho más barato que reparar los daños de un incendio o accidente eléctrico.",
      },
    ],
  },
  {
    slug: "elegir-plomero-hogar",
    category: "Plomería",
    categoryColor: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    emoji: "🔧",
    title: "Cómo elegir el plomero adecuado para tu hogar",
    excerpt:
      "No todos los plomeros son iguales. Estos son los puntos clave para no arrepentirte de tu elección.",
    readTime: "4 min",
    publishedAt: "2025-10-22",
    content: [
      {
        type: "p",
        text: "Contratar un plomero parece simple hasta que algo sale mal. Una pérdida mal reparada puede convertirse en humedad, daños estructurales o una factura de agua descontrolada. Elegir bien desde el principio te ahorra tiempo, plata y dolores de cabeza.",
      },
      { type: "h2", text: "Verificá que esté matriculado" },
      {
        type: "p",
        text: "En Argentina, los trabajos de plomería y gas requieren profesionales habilitados. Pedí el número de matrícula y verificalo. En EnCasa, todos los plomeros están matriculados — es un requisito para aparecer en la plataforma.",
      },
      { type: "h2", text: "Pedí referencias o buscá reseñas" },
      {
        type: "p",
        text: "Un buen plomero tiene historial. Mirá las reseñas de otros clientes, prestá atención a los comentarios sobre puntualidad, limpieza y si el problema quedó realmente resuelto.",
      },
      { type: "h2", text: "Pedí un presupuesto antes de que empiece" },
      {
        type: "p",
        text: "Un profesional serio siempre da un presupuesto por escrito antes de arrancar. Desconfiá de quien pide que le pagues mientras trabaja sin haber acordado el precio total.",
      },
      { type: "h2", text: "Preguntá si ofrece garantía" },
      {
        type: "p",
        text: "Los mejores plomeros respaldan su trabajo. Si la reparación falla en pocos días, un profesional confiable vuelve sin costo extra.",
      },
      {
        type: "ul",
        items: [
          "¿Cuántos años de experiencia tenés?",
          "¿Tenés matrícula habilitante?",
          "¿Podés darme un presupuesto por escrito?",
          "¿El trabajo tiene garantía?",
          "¿Trabajás los fines de semana o feriados?",
        ],
      },
      {
        type: "tip",
        text: "El plomero más barato casi nunca es el más conveniente. Calculá el costo total: materiales, mano de obra y posibles trabajos de retoque si algo sale mal.",
      },
    ],
  },
  {
    slug: "mantenimiento-preventivo-hogar",
    category: "Mantenimiento",
    categoryColor: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    emoji: "🏠",
    title: "Mantenimiento preventivo del hogar: la guía completa",
    excerpt:
      "Evitá gastos grandes con pequeñas tareas durante el año. Un checklist por estación.",
    readTime: "5 min",
    publishedAt: "2025-09-15",
    content: [
      {
        type: "p",
        text: "El mantenimiento preventivo es la diferencia entre un hogar que funciona bien y uno que te da sorpresas costosas. La lógica es simple: es mucho más barato revisar que reparar. Con un checklist ordenado por estación, podés mantener todo en orden sin que se te vaya de las manos.",
      },
      { type: "h2", text: "Primavera — preparación post-invierno" },
      {
        type: "ul",
        items: [
          "Revisá canaletas y desagotes: pueden estar tapados con hojas secas",
          "Inspeccioná el techo y sellados en busca de grietas por el frío",
          "Hacé el service del aire acondicionado antes de que arranque el calor",
          "Revisá puertas y ventanas — los marcos se contraen y dilatan con el frío",
        ],
      },
      { type: "h2", text: "Verano — foco en el calor y el agua" },
      {
        type: "ul",
        items: [
          "Revisá el termotanque y la presión del agua",
          "Limpiá filtros del aire acondicionado mensualmente",
          "Controlá que los desagotes del patio no estén obstruidos",
          "Revisá las conexiones de gas antes de usar la parrilla",
        ],
      },
      { type: "h2", text: "Otoño — preparación para el invierno" },
      {
        type: "ul",
        items: [
          "Revisá la caldera y los radiadores",
          "Controlá el aislamiento de puertas y ventanas",
          "Inspeccioná la instalación eléctrica, especialmente si usás estufas",
          "Limpiá canaletas antes de las lluvias",
        ],
      },
      { type: "h2", text: "Invierno — revisión de seguridad" },
      {
        type: "ul",
        items: [
          "Chequeá detectores de monóxido y humo",
          "Revisá que no haya humedad en paredes o cielorrasos",
          "Controlá el funcionamiento de la caldera mensualmente",
          "Asegurate de que los caños exteriores no queden expuestos al frío extremo",
        ],
      },
      {
        type: "tip",
        text: "Agendá estas revisiones en el calendario con recordatorios. El mantenimiento preventivo bien hecho puede ahorrarte entre un 30% y un 50% en reparaciones a lo largo del año.",
      },
    ],
  },
  {
    slug: "precios-pintura-mar-del-plata",
    category: "Pintura",
    categoryColor: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
    emoji: "🎨",
    title: "¿Cuánto cuesta pintar una habitación en Mar del Plata?",
    excerpt:
      "Guía de precios actualizada para pintura interior. Qué factores influyen en el costo y cómo pedir un presupuesto justo.",
    readTime: "4 min",
    publishedAt: "2025-12-05",
    content: [
      {
        type: "p",
        text: "El costo de pintar un ambiente varía bastante según el tamaño, el estado de las paredes, el tipo de pintura y la mano de obra. Acá te damos los rangos de precios más habituales en Mar del Plata para que vayas preparado cuando pidas presupuesto.",
      },
      { type: "h2", text: "Precio por m² de mano de obra" },
      {
        type: "p",
        text: "En Mar del Plata, la mano de obra para pintura interior ronda los $4.000 a $8.000 por m² (incluyendo preparación de superficie, masilla si es necesaria y dos manos de pintura). Los precios varían según el profesional y la complejidad del trabajo.",
      },
      { type: "h2", text: "Factores que elevan el precio" },
      {
        type: "ul",
        items: [
          "Paredes con humedad, descascaramiento o grietas (requieren preparación extra)",
          "Techos: son más trabajosos que las paredes y suelen cobrarse aparte",
          "Más de dos colores o diseños especiales",
          "Pintura de alta calidad o lavable (sube el costo del material)",
          "Mudanza de muebles incluida en el presupuesto",
        ],
      },
      { type: "h2", text: "Cómo pedir un presupuesto justo" },
      {
        type: "p",
        text: "Pedí siempre que el presupuesto detalle mano de obra y materiales por separado. Así podés comparar entre pintores y entender qué incluye cada uno. Desconfiá de presupuestos muy por debajo del promedio: suelen terminar con trabajos de baja calidad o cobros extras al final.",
      },
      {
        type: "tip",
        text: "Antes de pintar, revisá si hay humedad en las paredes. Pintar sobre humedad es tirar plata: la pintura se levanta en semanas. Primero solucioná el origen de la humedad.",
      },
    ],
  },
  {
    slug: "como-preparar-casa-invierno",
    category: "Mantenimiento",
    categoryColor: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    emoji: "🧥",
    title: "Cómo preparar tu casa para el invierno en Mar del Plata",
    excerpt:
      "El frío y la humedad de la costa son un combo exigente para las casas. Estas revisiones previas te ahorran problemas en los meses más fríos.",
    readTime: "4 min",
    publishedAt: "2025-11-28",
    content: [
      {
        type: "p",
        text: "Mar del Plata tiene inviernos húmedos y con vientos que ponen a prueba cualquier hogar. Prepararse antes de que llegue el frío es la diferencia entre pasar el invierno tranquilo o lidiar con humedad, filtraciones y fallas en la calefacción.",
      },
      { type: "h2", text: "Revisá la calefacción antes de que la necesites" },
      {
        type: "p",
        text: "Hacé el service de la caldera o los radiadores en otoño, antes de que arranque la demanda. En invierno los técnicos tienen semanas de espera y te quedás sin calefacción mientras esperás turno.",
      },
      { type: "h2", text: "Controlá los sellados de ventanas y puertas" },
      {
        type: "p",
        text: "Las corrientes de aire frío entran por sellados gastados o marcos que se contrajeron. Un simple burlón o sellador de silicona puede hacer una gran diferencia en el confort y en la factura de gas.",
      },
      { type: "h2", text: "Inspeccioná el techo y las canaletas" },
      {
        type: "p",
        text: "Las lluvias invernales pueden filtrar agua por tejas rotas o canaletas tapadas. Una revisión visual en otoño te permite arreglar problemas antes de que sean urgentes.",
      },
      {
        type: "ul",
        items: [
          "Limpiá las canaletas de hojas y suciedad acumulada",
          "Revisá si hay tejas rotas o desplazadas",
          "Controlá el estado del sellado en uniones de techo y paredes",
          "Chequeá que los desagotes pluviales no estén obstruidos",
        ],
      },
      { type: "h2", text: "Humedad: el enemigo número uno" },
      {
        type: "p",
        text: "La humedad por condensación es muy común en Mar del Plata en invierno. Ventilá los ambientes aunque haga frío, usá deshumidificadores en espacios cerrados y revisá si hay manchas nuevas en paredes o cielorrasos.",
      },
      {
        type: "tip",
        text: "Si ves manchas de humedad en las paredes, llamá a un profesional antes de pintar. Encubrir la humedad sin tratar el origen solo pospone el problema y lo hace más caro.",
      },
    ],
  },
];

export function getPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
