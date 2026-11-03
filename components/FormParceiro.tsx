'use client';
// Formulário de cadastro de parceiros. Envia para /api/parceiros (worker/index.ts),
// que cria o lead no Pipeline Sensoriz do Notion com Origem "Site" e Prioridade "Parceria".
// Sem JavaScript, o formulário funciona do mesmo jeito (envio normal).
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { SETORES_ROTULO } from '@/lib/site';
import { TIPOS_PARCERIA, PRAZO_RETORNO } from '@/lib/parcerias';

const OK = `Recebemos o seu cadastro. O nosso time entra em contato em até ${PRAZO_RETORNO}.`;

export default function FormParceiro() {
  const form = useRef<HTMLFormElement>(null);
  const [retorno, setRetorno] = useState('');
  const [enviando, setEnviando] = useState(false);

  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    if (p.get('enviado')) setRetorno(OK);
    if (p.get('erro')) setRetorno('Não foi possível enviar. Confira os campos obrigatórios e tente de novo.');
  }, []);

  async function enviar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setEnviando(true);
    setRetorno('Enviando…');
    try {
      const r = await fetch('/api/parceiros', { method: 'POST', body: new FormData(e.currentTarget), headers: { Accept: 'application/json' } });
      if (!r.ok) throw new Error();
      form.current?.reset();
      setRetorno(OK);
    } catch {
      setRetorno('Não foi possível enviar agora. Tente de novo em instantes.');
    } finally {
      setEnviando(false);
    }
  }

  return (
    <form ref={form} className="card form" method="post" action="/api/parceiros" onSubmit={enviar}>
      <div className="campo"><label htmlFor="p-empresa">Empresa</label><input id="p-empresa" name="empresa" autoComplete="organization" required /></div>
      <div className="campo"><label htmlFor="p-nome">Nome</label><input id="p-nome" name="nome" autoComplete="name" required /></div>
      <div className="campo"><label htmlFor="p-cargo">Cargo <span className="opcional">(opcional)</span></label><input id="p-cargo" name="cargo" autoComplete="organization-title" /></div>
      <div className="campo"><label htmlFor="p-email">E-mail corporativo</label><input id="p-email" name="email" type="email" autoComplete="email" required /></div>
      <div className="campo"><label htmlFor="p-telefone">Telefone ou WhatsApp</label><input id="p-telefone" name="telefone" type="tel" autoComplete="tel" required /></div>
      <div className="campo">
        <label htmlFor="p-tipo">Tipo de parceria</label>
        <select id="p-tipo" name="tipo" required defaultValue="">
          <option value="">Selecione</option>
          {Object.entries(TIPOS_PARCERIA).map(([id, nome]) => <option key={id} value={id}>{nome}</option>)}
          <option value="nao-sei">Ainda não sei</option>
        </select>
      </div>
      <div className="campo campo--largo"><label htmlFor="p-regiao">Região de atuação</label><input id="p-regiao" name="regiao" placeholder="Estados ou cidades onde você atua" required /></div>
      <fieldset className="campo campo--largo opcoes">
        <legend>Setores de atuação <span className="opcional">(opcional)</span></legend>
        <div className="opcoes__lista">
          {Object.entries(SETORES_ROTULO).map(([id, nome]) => (
            <label key={id}><input type="checkbox" name="setores" value={id} />{nome}</label>
          ))}
          <label><input type="checkbox" name="setores" value="outro" />Outro</label>
        </div>
      </fieldset>
      <div className="campo campo--largo"><label htmlFor="p-portfolio">Site ou LinkedIn <span className="opcional">(opcional)</span></label><input id="p-portfolio" name="portfolio" type="url" inputMode="url" placeholder="https://" /></div>
      <div className="campo campo--largo">
        <label htmlFor="p-mensagem">Conte como você pretende atuar <span className="opcional">(opcional)</span></label>
        <textarea id="p-mensagem" name="mensagem" rows={4} />
        <p className="ajuda">Quem você atende e onde atua ajuda a indicar o melhor formato.</p>
      </div>
      <div className="armadilha" aria-hidden="true"><label>Não preencha<input type="text" name="site_url" tabIndex={-1} autoComplete="off" /></label></div>
      <div className="campo campo--largo campo--consentimento">
        <input id="p-consentimento" name="consentimento" type="checkbox" required />
        <label htmlFor="p-consentimento">Concordo que a Sensoriz use estes dados para entrar em contato sobre a parceria, conforme a <Link href="/politicas/privacidade">política de privacidade</Link>.</label>
      </div>
      <button className="botao botao--primario" type="submit" disabled={enviando}>Enviar cadastro</button>
      <p className="form__retorno" role="status" aria-live="polite">{retorno}</p>
    </form>
  );
}
