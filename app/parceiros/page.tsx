import Link from 'next/link';
import Trilha from '@/components/Trilha';
import JsonLd from '@/components/JsonLd';
import Perguntas from '@/components/Perguntas';
import FormParceiro from '@/components/FormParceiro';
import { SETORES_ROTULO } from '@/lib/site';
import { TIPOS_PARCERIA, GRUPOS_PARCERIA, DESTAQUES, VALOR, PASSOS, PERGUNTAS } from '@/lib/parcerias';
import { faqJsonLd, trilhaJsonLd, metadados } from '@/lib/seo';

export const metadata = metadados({
  titulo: 'Seja parceiro da Sensoriz | Programa de parcerias',
  descricao: 'Indique, venda junto ou conecte a sua solução ao Sensoriz CORE. Cadastre-se e fale com o nosso time.',
  caminho: '/parceiros',
});
const trilha = [{ nome: 'Início', caminho: '/' }, { nome: 'Parceiros', caminho: '/parceiros' }];

export default function Parceiros() {
  return (
    <>
      <JsonLd dados={[trilhaJsonLd(trilha), ...faqJsonLd(PERGUNTAS)]} />
      <section className="pagina-topo">
        <div className="container pagina-topo__grade">
          <Trilha itens={trilha} />
          <p className="rotulo">Programa de parcerias</p>
          <h1 className="display-xl">Seja parceiro da Sensoriz</h1>
          <p className="lead">Indique, venda junto ou conecte a sua solução ao Sensoriz CORE. Cadastre-se e o nosso time entra em contato.</p>
          <div className="parceiros__acoes">
            <a className="botao botao--primario" href="#cadastro">Quero ser parceiro</a>
            <a className="botao botao--secundario" href="#formas">Ver formas de parceria</a>
          </div>
          <ul className="parceiros__destaques">
            {DESTAQUES.map((d) => <li key={d.titulo}><strong>{d.titulo}</strong><span>{d.texto}</span></li>)}
          </ul>
        </div>
      </section>

      <section className="secao secao--branca" id="formas">
        <div className="container">
          <div className="secao__topo"><p className="rotulo">Formas de parceria</p><h2 className="display-l">Quatro formas de fazer parte</h2></div>
          {GRUPOS_PARCERIA.map((g) => (
            <div className="parceiros__grupo" key={g.titulo}>
              <h3 className="titulo-secao">{g.titulo}</h3>
              <div className="grade grade--2">
                {g.itens.map((i) => (
                  <article className="card forma" key={i.id}>
                    <h4 className="titulo-secao">{TIPOS_PARCERIA[i.id]}</h4>
                    <p className="apoio">{i.texto}</p>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="secao">
        <div className="container">
          <div className="secao__topo"><p className="rotulo">Para o seu cliente</p><h2 className="display-l">O que o seu cliente passa a ter</h2></div>
          <div className="grade grade--3">
            {VALOR.map((v) => (
              <div className="card destaque" key={v.titulo}><h3 className="titulo-secao">{v.titulo}</h3><p className="apoio">{v.texto}</p></div>
            ))}
          </div>
          <p className="rotulo parceiros__setores-rotulo">Onde atuamos</p>
          <ul className="lista-links">
            {Object.entries(SETORES_ROTULO).map(([id, nome]) => (
              <li key={id}><Link className="botao botao--secundario" href={`/solucoes/${id}`}>{nome}</Link></li>
            ))}
          </ul>
        </div>
      </section>

      <section className="secao secao--branca">
        <div className="container">
          <div className="secao__topo"><p className="rotulo">Como funciona</p><h2 className="display-l">Três passos para começar</h2></div>
          <ol className="passos passos--3">
            {PASSOS.map((p, n) => (
              <li key={p.titulo}><span className="dado">{String(n + 1).padStart(2, '0')}</span><h3 className="titulo-secao">{p.titulo}</h3><p className="apoio">{p.texto}</p></li>
            ))}
          </ol>
        </div>
      </section>

      <section className="secao" id="cadastro">
        <div className="container diag">
          <div className="diag__texto">
            <p className="rotulo">Cadastro</p>
            <h2 className="display-l">Cadastre-se como parceiro</h2>
            <p className="lead">Preencha o formulário. O nosso time entra em contato para avaliar o perfil e alinhar os próximos passos. As condições são apresentadas nessa conversa.</p>
          </div>
          <FormParceiro />
        </div>
      </section>

      <section className="secao secao--branca">
        <div className="container"><Perguntas itens={PERGUNTAS} /></div>
      </section>
    </>
  );
}
