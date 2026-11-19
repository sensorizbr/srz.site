// Páginas de captação de leads por evento: /evento/<slug>.
// Para um evento novo, copie um item da lista e troque os dados. A página, o cálculo e o envio para o Notion são os mesmos.
// QR code do evento: https://www.sensoriz.com.br/evento/<slug>?utm_source=<slug>&utm_medium=evento

export type Evento = {
  slug: string;
  nome: string; // nome do evento, como aparece na página e no lead do Notion
  organizador: string;
  data: string; // texto livre, em português
  agenda: string; // link da agenda de reunião (Google Calendar, Calendly...). Vazio = botão leva ao WhatsApp
};

export const EVENTOS: Evento[] = [
  {
    slug: 'sindusfarma',
    nome: 'Qualificação Térmica e Cadeia do Frio para Medicamentos',
    organizador: 'Sindusfarma',
    data: '25 de novembro de 2026',
    agenda: 'https://calendar.app.google/STJBQknxefhe9oUW8',
  },
];

export const eventoPorSlug = (slug: string) => EVENTOS.find((e) => e.slug === slug);
