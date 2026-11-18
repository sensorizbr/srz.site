'use client';
// Diagnóstico de evento: 4 etapas curtas (método SPIN), custo invisível na tela e cadastro do lead.
// O lead vai para /api/diagnostico (worker/index.ts), que cria o card no Pipeline Sensoriz do Notion.
// O retorno (ROI) e o prazo de retorno ficam para a reunião, no CORE.
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { SITE } from '@/lib/site';
import type { Evento } from '@/lib/eventos';
import {
  PERFIS, ESCOPOS, FAIXAS, REGISTROS, EXCURSOES, QUALIFICACOES, PERDAS, VALORES_LOTE, MINUTOS, CUSTOS_HORA, PRIORIDADES,
  RESPOSTAS_VAZIAS, SETOR_DO_PERFIL, DIAS_MES, etapaCompleta, calcular, resumir, abertura,
  type Opcao, type Respostas,
} from '@/lib/diagnostico-evento';

const ETAPAS = [
  { titulo: 'Sua operação', texto: 'Quatro respostas para situar a sua cadeia fria.' },
  { titulo: 'O que acontece hoje', texto: 'Como a temperatura é registrada e o que já saiu da faixa.' },
  { titulo: 'O que isso custa', texto: 'Perdas e horas da equipe nos últimos 12 meses.' },
  { titulo: 'O que você quer resolver', texto: 'Escolha a prioridade que mais pesa na sua operação.' },
];

const numero = (v: number) => new Intl.NumberFormat('pt-BR').format(v);

function Selecao({ id, rotulo, valor, opcoes, aoMudar }: { id: keyof Respostas; rotulo: string; valor: string; opcoes: Opcao[]; aoMudar: (id: keyof Respostas, v: string) => void }) {
  return (
    <div className="campo">
      <label htmlFor={id}>{rotulo}</label>
      <select id={id} name={id} value={valor} onChange={(e) => aoMudar(id, e.target.value)} required>
        <option value="">Selecione</option>
        {opcoes.map((o) => <option key={o.id} value={o.id}>{o.rotulo}</option>)}
      </select>
    </div>
  );
}

export default function DiagnosticoEvento({ evento }: { evento: Evento }) {
  const topo = useRef<HTMLDivElement>(null);
  const [r, setR] = useState<Respostas>(RESPOSTAS_VAZIAS);
  const [etapa, setEtapa] = useState(0);
  const [fase, setFase] = useState<'perguntas' | 'resultado' | 'enviado'>('perguntas');
  const [retorno, setRetorno] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [acesso, setAcesso] = useState('');
  const primeira = useRef(true);

  useEffect(() => { setAcesso(window.location.search.replace(/^\?/, '')); }, []);
  // Ao trocar de etapa ou de fase, leva o leitor ao início do bloco (no celular a tela é curta)
  useEffect(() => {
    if (primeira.current) { primeira.current = false; return; }
    topo.current?.scrollIntoView({ block: 'start' });
    topo.current?.focus({ preventScroll: true });
  }, [etapa, fase]);

  const muda = (campo: keyof Respostas, valor: string) => setR((a) => ({ ...a, [campo]: valor }));
  const resultado = calcular(r);
  const agenda = evento.agenda || SITE.whatsapp;

  async function enviar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setEnviando(true);
    setRetorno('Enviando…');
    const dados = new FormData(e.currentTarget);
    dados.set('evento', `${evento.organizador}: ${evento.nome} (${evento.data})`);
    dados.set('setor', SETOR_DO_PERFIL[r.perfil] ?? 'outro');
    dados.set('pontos', r.pontos);
    dados.set('custo_invisivel', String(resultado.total));
    dados.set('custo_manual', String(resultado.fatorA));
    dados.set('custo_perdas', String(resultado.fatorB));
    dados.set('resumo', resumir(r));
    dados.set('abertura', abertura(r, resultado));
    dados.set('origem_acesso', acesso);
    try {
      const resp = await fetch('/api/diagnostico', { method: 'POST', body: dados, headers: { Accept: 'application/json' } });
      if (!resp.ok) throw new Error();
      setRetorno('');
      setFase('enviado');
    } catch {
      setRetorno('Não foi possível enviar agora. Confira os campos ou fale pelo WhatsApp.');
    } finally {
      setEnviando(false);
    }
  }

  return (
    <div className="evento__bloco" ref={topo} tabIndex={-1}>
      {fase === 'perguntas' && (
        <form className="card evento__etapa" onSubmit={(e) => { e.preventDefault(); if (!etapaCompleta(r, etapa)) return; if (etapa < ETAPAS.length - 1) setEtapa(etapa + 1); else setFase('resultado'); }}>
          <p className="rotulo">Etapa {etapa + 1} de {ETAPAS.length}</p>
          <div className="evento__progresso" role="progressbar" aria-valuemin={1} aria-valuemax={ETAPAS.length} aria-valuenow={etapa + 1} aria-label="Progresso do diagnóstico">
            {ETAPAS.map((_, i) => <span key={i} className={i <= etapa ? 'evento__passo evento__passo--feito' : 'evento__passo'} />)}
          </div>
          <h2 className="titulo-secao">{ETAPAS[etapa].titulo}</h2>
          <p className="apoio">{ETAPAS[etapa].texto}</p>

          <div className="evento__campos">
            {etapa === 0 && (<>
              <Selecao id="perfil" rotulo="Perfil da empresa" valor={r.perfil} opcoes={PERFIS} aoMudar={muda} />
              <Selecao id="escopo" rotulo="O que você controla" valor={r.escopo} opcoes={ESCOPOS} aoMudar={muda} />
              <Selecao id="faixa" rotulo="Faixa de temperatura principal" valor={r.faixa} opcoes={FAIXAS} aoMudar={muda} />
              <div className="campo">
                <label htmlFor="pontos">Quantos pontos você monitora?</label>
                <input id="pontos" name="pontos" type="number" inputMode="numeric" min={1} max={100000} value={r.pontos} onChange={(e) => muda('pontos', e.target.value)} required />
                <p className="ajuda">Uma geladeira, uma câmara, um veículo ou um equipamento contam como um ponto.</p>
              </div>
            </>)}
            {etapa === 1 && (<>
              <Selecao id="registro" rotulo="Como a temperatura é registrada hoje" valor={r.registro} opcoes={REGISTROS} aoMudar={muda} />
              <Selecao id="excursoes" rotulo="Excursões de temperatura nos últimos 12 meses" valor={r.excursoes} opcoes={EXCURSOES} aoMudar={muda} />
              <Selecao id="qualificacao" rotulo="Última qualificação térmica" valor={r.qualificacao} opcoes={QUALIFICACOES} aoMudar={muda} />
            </>)}
            {etapa === 2 && (<>
              <Selecao id="perdas" rotulo="Lotes ou cargas perdidos, ou retidos por suspeita, em 12 meses" valor={r.perdas} opcoes={PERDAS} aoMudar={muda} />
              <Selecao id="valorLote" rotulo="Valor médio de um lote ou carga" valor={r.valorLote} opcoes={VALORES_LOTE} aoMudar={muda} />
              <div className="campo">
                <label htmlFor="pessoas">Pessoas que fazem registro manual</label>
                <input id="pessoas" name="pessoas" type="number" inputMode="numeric" min={0} max={200} value={r.pessoas} onChange={(e) => muda('pessoas', e.target.value)} required />
              </div>
              <Selecao id="minutos" rotulo="Tempo por dia, por pessoa, com registro e conferência" valor={r.minutos} opcoes={MINUTOS} aoMudar={muda} />
              <Selecao id="custoHora" rotulo="Custo médio da hora dessa equipe" valor={r.custoHora} opcoes={CUSTOS_HORA} aoMudar={muda} />
            </>)}
            {etapa === 3 && (
              <fieldset className="evento__radios">
                <legend className="sr-only">Prioridade</legend>
                {PRIORIDADES.map((o) => (
                  <label key={o.id} className={r.prioridade === o.id ? 'evento__radio evento__radio--ativo' : 'evento__radio'}>
                    <input type="radio" name="prioridade" value={o.id} checked={r.prioridade === o.id} onChange={() => muda('prioridade', o.id)} required />
                    <span>{o.rotulo}</span>
                  </label>
                ))}
              </fieldset>
            )}
          </div>

          <div className="evento__acoes">
            {etapa > 0 && <button type="button" className="botao botao--secundario" onClick={() => setEtapa(etapa - 1)}>Voltar</button>}
            <button type="submit" className="botao botao--primario" disabled={!etapaCompleta(r, etapa)}>{etapa < ETAPAS.length - 1 ? 'Continuar' : 'Ver o custo da minha operação'}</button>
          </div>
        </form>
      )}

      {fase !== 'perguntas' && (
        <div className="evento__resultado">
          <section className="card" aria-labelledby="evento-custo">
            <p className="rotulo" id="evento-custo">Custo invisível estimado por ano</p>
            <p className="evento__total dado"><span className="evento__moeda">R$</span> {numero(resultado.total)}</p>
            <dl className="evento__linhas">
              <div><dt>Registro manual da equipe</dt><dd className="dado"><span className="evento__moeda">R$</span> {numero(resultado.fatorA)}</dd></div>
              <div><dt>Lotes ou cargas perdidos</dt><dd className="dado"><span className="evento__moeda">R$</span> {numero(resultado.fatorB)}</dd></div>
            </dl>
            <p className="apoio">Estimativa com os dados que você informou e valores de referência para o custo da hora e {DIAS_MES} dias trabalhados por mês. Os valores são arredondados para R$ 1.000.</p>
          </section>

          <section className="card evento__bloqueado" aria-labelledby="evento-retorno">
            <span className="chip chip--info">Na conversa</span>
            <h3 className="titulo-secao" id="evento-retorno">Retorno com a Sensoriz</h3>
            <p>Retorno anual, ROI e prazo de retorno saem na conversa com o nosso time, calculados com os seus dados no Sensoriz CORE. O cálculo inclui o risco de autuação pela Anvisa (RDC 430 e RDC 653).</p>
          </section>

          {fase === 'resultado' && (
            <form className="card form" method="post" action="/api/diagnostico" onSubmit={enviar}>
              <div className="campo campo--largo">
                <h3 className="titulo-secao">Receba o retorno na conversa</h3>
                <p className="apoio">Deixe seus dados. O nosso time entra em contato em até um dia útil.</p>
              </div>
              <div className="campo"><label htmlFor="nome">Nome</label><input id="nome" name="nome" autoComplete="name" required /></div>
              <div className="campo"><label htmlFor="cargo">Cargo</label><input id="cargo" name="cargo" autoComplete="organization-title" /></div>
              <div className="campo"><label htmlFor="empresa">Empresa</label><input id="empresa" name="empresa" autoComplete="organization" required /></div>
              <div className="campo"><label htmlFor="email">E-mail corporativo</label><input id="email" name="email" type="email" autoComplete="email" required /></div>
              <div className="campo campo--largo"><label htmlFor="telefone">Telefone ou WhatsApp</label><input id="telefone" name="telefone" type="tel" autoComplete="tel" required /></div>
              <div className="armadilha" aria-hidden="true"><label>Não preencha<input type="text" name="site_url" tabIndex={-1} autoComplete="off" /></label></div>
              <div className="campo campo--largo campo--consentimento">
                <input id="consentimento" name="consentimento" type="checkbox" required />
                <label htmlFor="consentimento">Concordo que a Sensoriz use estes dados para entrar em contato sobre o diagnóstico, conforme a <Link href="/politicas/privacidade">política de privacidade</Link>.</label>
              </div>
              <button className="botao botao--primario" type="submit" disabled={enviando}>Enviar e ver o ROI</button>
              <p className="form__retorno" role="status" aria-live="polite">{retorno}</p>
            </form>
          )}

          {fase === 'enviado' && (
            <section className="card evento__enviado" aria-live="polite">
              <h3 className="titulo-secao">Recebemos os seus dados</h3>
              <p>Escolha um horário para ver o ROI da sua operação com o time técnico da Sensoriz.</p>
              <div className="evento__acoes">
                <a className="botao botao--primario" href={agenda} target="_blank" rel="noopener noreferrer">Ver o ROI na conversa</a>
              </div>
              <p className="apoio">Se preferir, o nosso time entra em contato em até um dia útil.</p>
            </section>
          )}
        </div>
      )}
    </div>
  );
}
