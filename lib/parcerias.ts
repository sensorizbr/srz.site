// Conteúdo da página /parceiros. Edite aqui para mudar os textos sem mexer no layout.
// Os ids de TIPOS_PARCERIA precisam ser iguais aos de TIPOS em worker/index.ts.

// Prazo prometido no retorno do formulário e nas perguntas frequentes.
export const PRAZO_RETORNO = 'três dias úteis';

export const TIPOS_PARCERIA = {
  indicacao: 'Indicação',
  'parceiro-comercial': 'Parceiro comercial',
  'tecnologia-e-integracao': 'Tecnologia e integração',
  'servicos-complementares': 'Serviços complementares',
} as const;

export const GRUPOS_PARCERIA = [
  {
    titulo: 'Você tem clientes ou contatos',
    itens: [
      { id: 'indicacao', texto: 'Você apresenta empresas que têm a dor. A Sensoriz conduz a conversa, a demonstração e o contrato.' },
      { id: 'parceiro-comercial', texto: 'Você trabalha a oportunidade junto com o time da Sensoriz, do primeiro contato ao fechamento. Para consultores, representantes, corretoras e seguradoras.' },
    ],
  },
  {
    titulo: 'Você tem uma solução ou um serviço',
    itens: [
      { id: 'tecnologia-e-integracao', texto: 'O seu sistema se conecta ao Sensoriz CORE e entrega uma solução mais completa ao cliente. Para softwares de transporte, armazém, risco e rastreamento.' },
      { id: 'servicos-complementares', texto: 'Você presta um serviço de que as operações precisam, como calibração, instalação, consultoria ou auditoria. Pode ser contínuo ou pontual.' },
    ],
  },
] as const;

export const DESTAQUES = [
  { titulo: 'Condições claras', texto: 'Alinhadas em conversa direta, antes de começar.' },
  { titulo: 'Apoio do time', texto: 'Comercial e técnico, do primeiro contato à implantação.' },
  { titulo: 'Materiais de apoio', texto: 'Para apresentar a Sensoriz com segurança.' },
];

export const VALOR = [
  { titulo: 'Ver', texto: 'Acompanhe 8 parâmetros em uma só solução, em tempo real.' },
  { titulo: 'Agir', texto: 'Receba aviso só quando algo foge do esperado.' },
  { titulo: 'Provar', texto: 'Tenha registros no padrão ALCOA++ para auditorias.' },
];

export const PASSOS = [
  { titulo: 'Cadastre-se', texto: 'Preencha o formulário com os dados da sua empresa.' },
  { titulo: 'Converse com o time', texto: 'Alguém da Sensoriz entra em contato para conhecer o seu perfil e alinhar o formato da parceria.' },
  { titulo: 'Comece', texto: 'Combinamos as condições e você recebe o apoio para atuar.' },
];

export const PERGUNTAS = [
  { pergunta: 'Preciso vender equipamentos?', resposta: 'Não. Você apresenta a solução de monitoramento e o time da Sensoriz cuida da parte técnica.' },
  { pergunta: 'Como funciona a remuneração?', resposta: 'As condições variam conforme o tipo de parceria e são apresentadas na conversa com o nosso time, depois do cadastro.' },
  { pergunta: 'Posso atuar em mais de um formato?', resposta: 'Pode. Conte no formulário e alinhamos na conversa.' },
  { pergunta: 'Quanto tempo leva o retorno?', resposta: `Até ${PRAZO_RETORNO} após o cadastro.` },
];
