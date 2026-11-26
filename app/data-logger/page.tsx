// /data-logger: página de captação para quem busca "data logger". Fora do menu, indexável e no sitemap.
// Texto aprovado pela Nicole em 26/11/2026. Compara o data logger tradicional com a solução (hardware + software).
import Link from 'next/link';
import Trilha from '@/components/Trilha';
import Perguntas from '@/components/Perguntas';
import ChamadaDiagnostico from '@/components/ChamadaDiagnostico';
import JsonLd from '@/components/JsonLd';
import { SETORES_ROTULO } from '@/lib/site';
import { faqJsonLd, metadados, trilhaJsonLd } from '@/lib/seo';

export const metadata = metadados({
  titulo: 'Data logger de temperatura: o que é e como ir além',
  descricao: 'Entenda a diferença entre data logger e monitoramento em tempo real, com tabela comparativa e perguntas frequentes. Peça um diagnóstico gratuito.',
  caminho: '/data-logger',
});

const trilha = [{ nome: 'Início', caminho: '/' }, { nome: 'Data logger', caminho: '/data-logger' }];

const NIVEIS = [
  { n: '01', titulo: 'Registrar', quem: 'Data logger', texto: 'Guarda a temperatura e responde: o que aconteceu?' },
  { n: '02', titulo: 'Monitorar', quem: 'Alerta em tempo real', texto: 'Avisa na hora quando há desvio.' },
  { n: '03', titulo: 'Gerir', quem: 'Solução Sensoriz', texto: 'Mede 8 parâmetros, mostra onde está o ativo, avisa por exceção e gera a prova para auditoria. Responde: o que está acontecendo, o que fazer e como provar?' },
] as const;

const COMPARACAO = [
  ['Pergunta que responde', 'O que aconteceu?', 'O que está acontecendo, o que fazer e como provar?'],
  ['Quando você vê o dado', 'Depois, ao ler o aparelho', 'Na hora, na Sensoriz CORE'],
  ['Aviso de desvio', 'Em geral, não avisa ninguém', 'Alerta para a equipe quando algo sai do esperado'],
  ['Quem precisa agir', 'Alguém precisa lembrar de conferir', 'Gestão por exceção: a equipe só é chamada quando há desvio'],
  ['O que mede', 'Em geral, temperatura e, em alguns modelos, umidade', '8 parâmetros: temperatura, umidade, luminosidade, pressão atmosférica, impacto, vibração, localização e orientação (X, Y, Z)'],
  ['Localização', 'Em geral, não informa onde a carga está', 'Mostra onde o ativo está'],
  ['Sinal fraco, tempestade ou clima extremo', 'Registra e guarda', 'A solução segue registrando e envia o histórico quando a conexão volta'],
  ['Queda de energia', 'Em geral, não detecta', 'O modelo na tomada detecta a queda de energia'],
  ['Prova para auditoria', 'Um arquivo por aparelho, que alguém precisa juntar', 'Histórico e relatórios na CORE, no padrão ALCOA++'],
  ['Instalação', 'Programar e recolher cada aparelho', 'Plug and play, com implantação e suporte'],
] as const;

const SETORES = [
  { id: 'farmacias-e-clinicas', texto: 'Geladeiras e câmaras de medicamentos e insumos. O aviso chega antes da perda, e o histórico fica pronto para a fiscalização.' },
  { id: 'logistica-e-cadeia-fria', texto: 'Carga em movimento e carga parada, na mesma plataforma.' },
  { id: 'saude', texto: 'Localização de equipamentos e kits cirúrgicos e rede de frio de vacinas.' },
  { id: 'ativos-de-alto-valor', texto: 'Ativos de alto valor, como data centers, com temperatura, impacto e localização sob monitoramento.' },
] as const;

const PERGUNTAS = [
  { pergunta: 'O que é um data logger?', resposta: 'É um aparelho que mede a temperatura (e, em alguns modelos, a umidade) e guarda os valores para consulta depois.' },
  { pergunta: 'Para que serve um data logger de temperatura?', resposta: 'Para registrar a temperatura em transporte, armazenagem, câmaras e geladeiras, e saber depois o que aconteceu.' },
  { pergunta: 'Qual a diferença entre data logger e monitoramento em tempo real?', resposta: 'O data logger mostra o que aconteceu. O monitoramento em tempo real avisa a equipe enquanto o desvio acontece, para que ela decida a tempo.' },
  { pergunta: 'Data logger precisa de internet?', resposta: 'Os tradicionais não: eles guardam os dados e você lê depois. Na solução Sensoriz, o registro continua mesmo sem sinal, e o histórico é enviado quando a conexão volta.' },
  { pergunta: 'O data logger serve para auditoria e fiscalização?', resposta: 'Depende do que a norma e o auditor exigem. A RDC 430/2020 trata do monitoramento com instrumentos calibrados e da guarda dos registros. O importante é ter um histórico confiável e fácil de apresentar, e a Sensoriz CORE atende ao padrão ALCOA++ de integridade de dados.' },
  { pergunta: 'A Sensoriz substitui o data logger?', resposta: 'A solução faz o que o data logger faz e acrescenta aviso na hora, localização e prova para auditoria.' },
  { pergunta: 'Como saber se o meu monitoramento atual é suficiente?', resposta: 'Pergunte quem é avisado quando a temperatura sai da faixa, em quanto tempo e que prova fica depois. O diagnóstico gratuito ajuda a responder.' },
];

export default function PaginaDataLogger() {
  return (
    <>
      <JsonLd dados={[trilhaJsonLd(trilha), ...faqJsonLd(PERGUNTAS)]} />

      <section className="pagina-topo">
        <div className="container pagina-topo__grade">
          <Trilha itens={trilha} />
          <p className="rotulo">Data logger</p>
          <h1 className="display-xl">Data logger não é monitoramento em tempo real</h1>
          <p className="lead">Data logger é um aparelho que registra a temperatura ao longo do tempo. A solução Sensoriz é outra coisa: hardware e software que mostram o que está acontecendo, avisam a equipe na hora e provam o que aconteceu.</p>
          <div className="acoes">
            <Link className="botao botao--primario" href="/diagnostico">Solicitar diagnóstico gratuito</Link>
            <a className="botao botao--secundario" href="#comparacao">Ver a comparação</a>
          </div>
        </div>
      </section>

      <section className="secao secao--branca">
        <div className="container">
          <div className="secao__topo">
            <p className="rotulo">O limite do data logger</p>
            <h2 className="display-l">Onde a operação fica no escuro</h2>
            <p className="lead">O data logger registra o que aconteceu. Ele ajuda a explicar uma temperatura fora da faixa depois que ela passou.</p>
            <p className="lead">Na maioria dos modelos, ele não avisa ninguém na hora. Se a câmara falha na sexta à noite, a equipe descobre na segunda, com o lote já comprometido.</p>
          </div>
        </div>
      </section>

      <section className="secao">
        <div className="container">
          <div className="secao__topo">
            <p className="rotulo">Três níveis</p>
            <h2 className="display-l">Não é um data logger melhor. É outro nível.</h2>
          </div>
          <ol className="grade grade--3 pilares">
            {NIVEIS.map((n) => (
              <li className="card" key={n.n}>
                <span className="pilares__n dado">{n.n}</span>
                <h3 className="titulo-secao">{n.titulo}</h3>
                <p className="rotulo">{n.quem}</p>
                <p className="apoio">{n.texto}</p>
              </li>
            ))}
          </ol>
          <p className="lead" style={{ marginTop: 'var(--space-5)' }}>O data logger é uma parte do caminho. A Sensoriz cobre o caminho inteiro.</p>
        </div>
      </section>

      <section className="secao secao--branca" id="comparacao">
        <div className="container">
          <div className="secao__topo">
            <p className="rotulo">Comparação</p>
            <h2 className="display-l">Data logger tradicional e solução Sensoriz</h2>
          </div>
          <div className="tabela-rolagem">
            <table className="tabela-valor tabela-comparacao">
              <caption className="apoio">Comparação geral entre data loggers tradicionais e a solução Sensoriz (hardware + software)</caption>
              <thead><tr><th scope="col"><span className="sr-only">Critério</span></th><th scope="col">Data logger tradicional</th><th scope="col">Solução Sensoriz</th></tr></thead>
              <tbody>
                {COMPARACAO.map(([criterio, tradicional, sensoriz]) => (
                  <tr key={criterio}><th scope="row">{criterio}</th><td data-label="Data logger tradicional">{tradicional}</td><td data-label="Solução Sensoriz">{sensoriz}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="secao">
        <div className="container">
          <div className="secao__topo">
            <p className="rotulo">Também registra</p>
            <h2 className="display-l">A solução também faz o trabalho do data logger</h2>
            <p className="lead">Ela registra as medições e guarda o histórico, inclusive sem sinal. O registro é configurável: o padrão é a cada 15 minutos e pode ser mais frequente.</p>
            <p className="lead">Em voo ou em navio em navegação, o dispositivo entra em modo avião sozinho, segue registrando e envia o histórico no pouso. A diferença está no que vem depois: os dados chegam à CORE e a equipe é avisada.</p>
          </div>
        </div>
      </section>

      <section className="secao secao--branca">
        <div className="container">
          <div className="secao__topo"><p className="rotulo">Como a Sensoriz resolve</p><h2 className="display-l">Ver, agir e provar</h2></div>
          <ol className="grade grade--3 pilares">
            <li className="card"><span className="pilares__n dado">01</span><h3 className="titulo-secao">Ver</h3><p className="apoio">A solução mede 8 parâmetros e mostra a condição de cada ativo, parado ou em movimento.</p></li>
            <li className="card"><span className="pilares__n dado">02</span><h3 className="titulo-secao">Agir</h3><p className="apoio">O alerta chega à equipe quando há desvio, a tempo de decidir antes do descarte.</p></li>
            <li className="card"><span className="pilares__n dado">03</span><h3 className="titulo-secao">Provar</h3><p className="apoio">Histórico confiável das medições e relatórios no padrão ALCOA++ para auditoria.</p></li>
          </ol>
          <div className="card" style={{ display: 'grid', gap: 'var(--space-2)', maxWidth: 360, marginTop: 'var(--space-5)' }}>
            <p className="rotulo">Câmara 02</p>
            <p className="dado" style={{ fontSize: 32, margin: 0 }}>5,2 <span style={{ fontFamily: 'var(--font-texto)', fontSize: 18 }}>°C</span></p>
            <p className="apoio" style={{ margin: 0 }}>Leitura às 14:32</p>
            <span className="chip chip--normal" style={{ justifySelf: 'start' }}>Normal</span>
            <p className="apoio" style={{ margin: 0 }}>Valores ilustrativos</p>
          </div>
        </div>
      </section>

      <section className="secao">
        <div className="container">
          <div className="secao__topo"><p className="rotulo">Por setor</p><h2 className="display-l">Para quem faz diferença</h2></div>
          <ul className="grade grade--4 ambientes">
            {SETORES.map((s) => (
              <li className="card card-link" key={s.id}>
                <h3 className="titulo-secao"><Link href={`/solucoes/${s.id}`}>{SETORES_ROTULO[s.id]}</Link></h3>
                <p className="apoio">{s.texto}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="secao secao--branca"><div className="container"><Perguntas itens={PERGUNTAS} /></div></section>

      <ChamadaDiagnostico
        titulo="Descubra onde sua operação ainda está no escuro"
        texto="Nosso time avalia a sua operação e mostra onde o aviso na hora faz diferença. Sem custo."
      />
    </>
  );
}
