// Corpo da página de captação de um evento. Usado por /evento (evento ativo) e por /evento/<slug>.
import DiagnosticoEvento from '@/components/DiagnosticoEvento';
import type { Evento } from '@/lib/eventos';

export default function PaginaEvento({ e }: { e: Evento }) {
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
