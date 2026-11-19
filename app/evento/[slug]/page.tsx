// /evento/<slug>: página de captação de leads de um evento (lib/eventos.ts). Fora do sitemap e sem indexação.
import { notFound } from 'next/navigation';
import DiagnosticoEvento from '@/components/DiagnosticoEvento';
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

export default async function PaginaEvento({ params }: Props) {
  const e = eventoPorSlug((await params).slug);
  if (!e) notFound();
  return (
    <section className="secao">
      <div className="container diag">
        <div className="diag__texto">
          <p className="rotulo">{e.organizador} · {e.data}</p>
          <h1 className="display-l">Descubra o custo atual da sua cadeia fria</h1>
          <p className="lead">Responda cinco etapas curtas, a última com seus dados de contato. Em dois minutos você vê quanto o registro manual e a perda de lotes custam por ano na sua operação.</p>
          <ul className="diag__lista">
            <li>Custo anual estimado, com os seus dados</li>
            <li>Conversa com o time técnico, com o ROI calculado no Sensoriz CORE</li>
            <li>Sem custo</li>
          </ul>
          <p className="apoio">Página para quem participa do evento <strong>{e.nome}</strong>.</p>
        </div>
        <DiagnosticoEvento evento={e} />
      </div>
    </section>
  );
}
