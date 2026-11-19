// /evento: link fixo do cartão de visita. Mostra o evento ativo (EVENTO_ATIVO em lib/eventos.ts), sem mudar o QR code impresso.
// Fora do sitemap e sem indexação.
import PaginaEvento from '@/components/PaginaEvento';
import { eventoAtivo } from '@/lib/eventos';
import { metadados } from '@/lib/seo';

export const metadata = metadados({
  titulo: 'Descubra o custo atual da sua cadeia fria',
  descricao: 'Responda cinco etapas curtas e veja quanto o registro manual e a perda de lotes custam por ano na sua operação.',
  caminho: '/evento',
  semIndice: true,
});

export default function PaginaEventoAtivo() {
  return <PaginaEvento e={eventoAtivo()} />;
}
