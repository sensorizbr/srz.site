// Diagnóstico de eventos (método SPIN: situação, problema, implicação, necessidade).
// O cálculo segue as fórmulas da calculadora de ROI do CORE (RoiCalculationPdfBuilder, srz.bff-service):
//   perda operacional = pessoas × minutos por dia ÷ 60 × dias por mês × custo hora × 12
//   perda de carga    = lotes ou cargas perdidos por ano × valor médio do lote
// O risco da Anvisa, os ganhos, o ROI e o prazo de retorno NÃO entram aqui: são calculados na reunião, no CORE.

export type Opcao = { id: string; rotulo: string; valor?: number };

export const DIAS_MES = 22;

export const PERFIS: Opcao[] = [
  { id: 'industria', rotulo: 'Indústria farmacêutica' },
  { id: 'distribuidor', rotulo: 'Distribuidor ou operador logístico' },
  { id: 'farmacia', rotulo: 'Farmácia, clínica ou hospital' },
  { id: 'outro', rotulo: 'Outro' },
];
// Id de setor aceito pelo Worker (worker/index.ts)
export const SETOR_DO_PERFIL: Record<string, string> = {
  industria: 'outro',
  distribuidor: 'logistica-e-cadeia-fria',
  farmacia: 'farmacias-e-clinicas',
  outro: 'outro',
};

export const ESCOPOS: Opcao[] = [
  { id: 'armazenagem', rotulo: 'Armazenagem' },
  { id: 'transporte', rotulo: 'Transporte' },
  { id: 'ambos', rotulo: 'Armazenagem e transporte' },
  { id: 'outras', rotulo: 'Outras áreas da operação' },
];

export const FAIXAS: Opcao[] = [
  { id: '2-8', rotulo: '2 a 8 °C' },
  { id: '15-25', rotulo: '15 a 25 °C' },
  { id: 'congelado', rotulo: 'Congelado' },
  { id: 'varias', rotulo: 'Mais de uma faixa' },
];

export const REGISTROS: Opcao[] = [
  { id: 'manual', rotulo: 'Manual, em papel ou planilha' },
  { id: 'datalogger', rotulo: 'Datalogger lido depois da viagem ou do período' },
  { id: 'online', rotulo: 'Sistema online com alertas' },
  { id: 'nenhum', rotulo: 'Sem registro formal' },
];

export const EXCURSOES: Opcao[] = [
  { id: '0', rotulo: 'Nenhuma' },
  { id: '1-2', rotulo: '1 a 2' },
  { id: '3-5', rotulo: '3 a 5' },
  { id: '6+', rotulo: 'Mais de 5' },
];

export const QUALIFICACOES: Opcao[] = [
  { id: 'menos-1', rotulo: 'Há menos de 1 ano' },
  { id: '1-2', rotulo: 'Entre 1 e 2 anos' },
  { id: 'mais-2', rotulo: 'Há mais de 2 anos' },
  { id: 'nunca', rotulo: 'Nunca foi feita' },
];

export const PERDAS: Opcao[] = [
  { id: '0', rotulo: 'Nenhum', valor: 0 },
  { id: '1', rotulo: '1', valor: 1 },
  { id: '2', rotulo: '2', valor: 2 },
  { id: '3-5', rotulo: '3 a 5', valor: 4 },
  { id: '6+', rotulo: '6 ou mais', valor: 8 },
];

export const VALORES_LOTE: Opcao[] = [
  { id: 'ate-50', rotulo: 'Até R$ 50 mil', valor: 30000 },
  { id: '50-200', rotulo: 'De R$ 50 mil a R$ 200 mil', valor: 125000 },
  { id: '200-500', rotulo: 'De R$ 200 mil a R$ 500 mil', valor: 350000 },
  { id: '500+', rotulo: 'Acima de R$ 500 mil', valor: 750000 },
];

// Aferição manual: quantas rodadas por dia e quanto tempo cada rodada leva por pessoa.
// Minutos por dia, por pessoa = rodadas × minutos por rodada (entra na fórmula do CORE).
export const AFERICOES: Opcao[] = [
  { id: '0', rotulo: 'Nenhuma', valor: 0 },
  { id: '1', rotulo: '1 vez por dia', valor: 1 },
  { id: '2', rotulo: '2 vezes por dia', valor: 2 },
  { id: '3', rotulo: '3 vezes por dia', valor: 3 },
  { id: '4+', rotulo: '4 vezes por dia ou mais', valor: 4 },
];

export const MINUTOS_RODADA: Opcao[] = [
  { id: '10', rotulo: 'Até 10 minutos', valor: 10 },
  { id: '20', rotulo: 'Cerca de 20 minutos', valor: 20 },
  { id: '30', rotulo: 'Cerca de 30 minutos', valor: 30 },
  { id: '60', rotulo: '1 hora ou mais', valor: 60 },
];

export const CUSTOS_HORA: Opcao[] = [
  { id: 'ate-50', rotulo: 'Até R$ 50 por hora', valor: 35 },
  { id: '50-100', rotulo: 'De R$ 50 a R$ 100 por hora', valor: 75 },
  { id: '100+', rotulo: 'Acima de R$ 100 por hora', valor: 130 },
];

export const PRIORIDADES: Opcao[] = [
  { id: 'perda', rotulo: 'Evitar a perda de lotes e cargas' },
  { id: 'tempo', rotulo: 'Liberar a equipe do registro manual' },
  { id: 'inspecao', rotulo: 'Chegar à inspeção com o registro pronto' },
  { id: 'clientes', rotulo: 'Provar a conformidade para clientes e contratantes' },
  { id: 'todas', rotulo: 'Todas as opções acima' },
];

export type Respostas = {
  perfil: string; escopo: string; faixa: string; pontos: string;
  registro: string; excursoes: string; qualificacao: string;
  perdas: string; valorLote: string; pessoas: string; afericoes: string; minutosRodada: string; custoHora: string;
  prioridade: string;
};

export const RESPOSTAS_VAZIAS: Respostas = {
  perfil: '', escopo: '', faixa: '', pontos: '',
  registro: '', excursoes: '', qualificacao: '',
  perdas: '', valorLote: '', pessoas: '2', afericoes: '', minutosRodada: '', custoHora: '',
  prioridade: '',
};

// Campos obrigatórios de cada etapa
export const CAMPOS_DA_ETAPA: (keyof Respostas)[][] = [
  ['perfil', 'escopo', 'faixa', 'pontos'],
  ['registro', 'excursoes', 'qualificacao'],
  ['perdas', 'valorLote', 'pessoas', 'afericoes', 'minutosRodada', 'custoHora'],
  ['prioridade'],
];

// A etapa 5 (dados de contato) é validada pelo próprio formulário
export const TOTAL_ETAPAS = CAMPOS_DA_ETAPA.length + 1;
export const etapaCompleta = (r: Respostas, etapa: number) =>
  etapa >= CAMPOS_DA_ETAPA.length || CAMPOS_DA_ETAPA[etapa].every((c) => r[c].trim() !== '') && (etapa !== 0 || Number(r.pontos) >= 1);

const acha = (lista: Opcao[], id: string) => lista.find((o) => o.id === id);
const rotulo = (lista: Opcao[], id: string) => acha(lista, id)?.rotulo ?? '';

export type Resultado = { fatorA: number; fatorB: number; total: number };

// Arredonda para R$ 1.000: é uma estimativa, não um valor exato
const mil = (v: number) => Math.round(v / 1000) * 1000;

export function calcular(r: Respostas): Resultado {
  const pessoas = Math.min(200, Math.max(0, Number(r.pessoas) || 0));
  const minutos = (acha(AFERICOES, r.afericoes)?.valor ?? 0) * (acha(MINUTOS_RODADA, r.minutosRodada)?.valor ?? 0);
  const custoHora = acha(CUSTOS_HORA, r.custoHora)?.valor ?? 0;
  const perdas = acha(PERDAS, r.perdas)?.valor ?? 0;
  const valorLote = acha(VALORES_LOTE, r.valorLote)?.valor ?? 0;
  const fatorA = mil(pessoas * (minutos / 60) * DIAS_MES * custoHora * 12);
  const fatorB = mil(perdas * valorLote);
  return { fatorA, fatorB, total: fatorA + fatorB };
}

export function resumir(r: Respostas): string {
  return [
    `Perfil: ${rotulo(PERFIS, r.perfil)}`,
    `Escopo: ${rotulo(ESCOPOS, r.escopo)}`,
    `Faixa: ${rotulo(FAIXAS, r.faixa)}`,
    `Pontos: ${r.pontos}`,
    `Registro hoje: ${rotulo(REGISTROS, r.registro)}`,
    `Excursões por ano: ${rotulo(EXCURSOES, r.excursoes)}`,
    `Última qualificação térmica: ${rotulo(QUALIFICACOES, r.qualificacao)}`,
    `Lotes ou cargas perdidos por ano: ${rotulo(PERDAS, r.perdas)}`,
    `Valor médio do lote: ${rotulo(VALORES_LOTE, r.valorLote)}`,
    `Equipe no registro manual: ${r.pessoas} pessoas, ${rotulo(AFERICOES, r.afericoes).toLowerCase()}, ${rotulo(MINUTOS_RODADA, r.minutosRodada).toLowerCase()} por rodada, ${rotulo(CUSTOS_HORA, r.custoHora)}`,
    `Prioridade: ${rotulo(PRIORIDADES, r.prioridade)}`,
  ].join('. ') + '.';
}

// Frase para o SDR abrir a ligação, montada com o que a pessoa respondeu
export function abertura(r: Respostas, res: Resultado): string {
  const maior = res.fatorA >= res.fatorB ? 'do tempo da equipe com registro manual' : 'dos lotes ou cargas perdidos';
  const risco = r.qualificacao === 'nunca' || r.qualificacao === 'mais-2'
    ? ' Qualificação térmica antiga ou inexistente: abrir pelo risco em inspeção.'
    : '';
  const prioridade = r.prioridade === 'todas'
    ? 'O lead marcou todas as prioridades (perda de lotes, tempo da equipe, inspeção e clientes). Começar pelo maior custo.'
    : `Começar pela prioridade "${rotulo(PRIORIDADES, r.prioridade)}".`;
  return `${prioridade} O maior custo vem ${maior}.${risco}`;
}

export const rotuloDe = { prioridade: (id: string) => rotulo(PRIORIDADES, id) };
