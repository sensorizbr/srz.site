// /evento/<slug>: página de captação de leads de um evento (lib/eventos.ts). Fora do sitemap e sem indexação.
import { notFound } from 'next/navigation';
import PaginaEvento from '@/components/PaginaEvento';
import { EVENTOS, eventoPorSlug } from '@/lib/eventos';
import { metadados } from '@/lib/seo';

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export const generateStaticParams = () => EVENTOS.map((e) => ({ slug: e.slug }));

export async function generateMetadata({ params }: Props) {
  const e = eventoPorSlug((await params).slug);
  if (!e) return {};
  return metadados({
    titulo: 'Descubra o custo atual da sua cadeia fria',
    descricao: 'Responda cinco etapas curtas e veja quanto o registro manual e a perda de lotes custam por ano na sua operação.',
    caminho: `/evento/${e.slug}`,
    semIndice: true,
  });
}

export default async function PaginaEventoPorSlug({ params }: Props) {
  const e = eventoPorSlug((await params).slug);
  if (!e) notFound();
  return <PaginaEvento e={e} />;
}
