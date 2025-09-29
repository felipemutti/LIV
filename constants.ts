import { User, Lead } from './types';

// Note: This is mock data for development. It will be replaced by a real backend.
export const USERS_MOCK: User[] = [
    {
        id: 'admin-01',
        name: 'Admin User',
        email: 'admin@liv.com',
        password: 'password123',
        cpf: '000.000.000-00',
        rg: '00.000.000-0',
        profession: 'Administrator',
        maritalStatus: 'Married',
        address: '123 Admin St, City, State',
        status: 'Approved',
        isAdmin: true,
        registrationDate: new Date('2023-01-01').toISOString(),
        signature: 'Admin User'
    },
    {
        id: 'partner-01',
        name: 'Parceiro Aprovado',
        email: 'partner@liv.com',
        password: 'password123',
        cpf: '111.111.111-11',
        rg: '11.111.111-1',
        profession: 'Consultor',
        maritalStatus: 'Single',
        address: '456 Partner Av, City, State',
        status: 'Approved',
        isAdmin: false,
        registrationDate: new Date('2023-02-15').toISOString(),
        signature: 'Parceiro Aprovado'
    },
    {
        id: 'partner-02',
        name: 'Maria Parceira Pendente',
        email: 'maria@parceiro.com',
        password: 'password123',
        cpf: '222.222.222-22',
        rg: '22.222.222-2',
        profession: 'Vendedora',
        maritalStatus: 'Married',
        address: '789 Partner St, City, State',
        status: 'Pending',
        isAdmin: false,
        registrationDate: new Date('2023-03-20').toISOString(),
        signature: 'Maria Parceira Pendente'
    },
];

export const LEADS_MOCK: Lead[] = [
    {
        id: 'lead-01',
        partnerId: 'partner-01',
        partnerName: 'Parceiro Aprovado',
        clientName: 'Cliente Final Um',
        clientContact: '(11) 98765-4321',
        status: 'Convertido',
        commission: 1500,
        registrationDate: new Date('2023-03-01').toISOString(),
    },
    {
        id: 'lead-02',
        partnerId: 'partner-01',
        partnerName: 'Parceiro Aprovado',
        clientName: 'Cliente Final Dois',
        clientContact: '(11) 91234-5678',
        status: 'Comissão Paga',
        commission: 1250.75,
        registrationDate: new Date('2023-02-20').toISOString(),
        paymentDate: new Date('2023-03-10').toISOString(),
    },
     {
        id: 'lead-03',
        partnerId: 'partner-01',
        partnerName: 'Parceiro Aprovado',
        clientName: 'Cliente Final Três',
        clientContact: '(11) 98888-7777',
        status: 'Em Negociação',
        registrationDate: new Date('2023-03-15').toISOString(),
    },
];

export const CONTRACT_TEXT = `CONTRATO DE PRESTAÇÃO DE SERVIÇOS DE INDICAÇÃO DE NEGÓCIOS
SEM VÍNCULO EMPREGATÍCIO

CONTRATANTE:
FELIPE MUTTI CORRETAGEM DE SEGUROS LTDA, pessoa jurídica de direito privado, inscrita no CNPJ sob nº 61.319.803/0001-06, com nome fantasia LIV SEGUROS, e SUSEP nº 252170500, doravante denominada CONTRATANTE.

CONTRATADO(A):
[Nome completo do(a) Contratado(a)], Brasileiro(a), [estado civil], [profissão], inscrito(a) no CPF nº [CPF] e RG nº [RG], residente e domiciliado(a) em [endereço completo], doravante denominado(a) CONTRATADO(A).

CLÁUSULA PRIMEIRA – DO OBJETO
O presente contrato tem como objeto a prestação de serviços autônomos de indicação de potenciais clientes para a CONTRATANTE, relacionados a produtos de seguro de vida.

CLÁUSULA SEGUNDA – DA NATUREZA DA RELAÇÃO
As partes reconhecem que este contrato não gera vínculo empregatício, subordinação, habitualidade ou exclusividade entre CONTRATANTE e CONTRATADO(A), nos termos da legislação trabalhista vigente. O(A) CONTRATADO(A) atuará como prestador(a) de serviços autônomo(a), assumindo integral responsabilidade por seus encargos fiscais, previdenciários e tributários.

CLÁUSULA TERCEIRA – DA REMUNERAÇÃO
A título de remuneração pelos serviços de indicação:
- Para seguros de vida tradicionais, a comissão será de 100% (cem por cento) da primeira parcela paga pelo cliente indicado.
- Para seguros de saúde, a comissão será de 100% (cem por cento) da primeira parcela paga pelo cliente indicado.
- Para seguros de vida resgatáveis, a comissão será de 50% (cinquenta por cento) da primeira parcela paga pelo cliente indicado.
O pagamento será realizado em até 10 (dez) dias úteis após a compensação financeira da primeira parcela pelo cliente indicado.

CLÁUSULA QUARTA – DO CONSENTIMENTO PRÉVIO
O(A) CONTRATADO(A) declara, sob as penas da lei, que todos os clientes indicados foram previamente contatados e consentiram expressamente em receber o contato de um corretor da CONTRATANTE, isentando a CONTRATANTE de qualquer responsabilidade por contatos não autorizados.

CLÁUSULA QUINTA – DAS DESPESAS
Todas as despesas necessárias à execução dos serviços correrão por conta exclusiva do(a) CONTRATADO(A), não cabendo à CONTRATANTE qualquer responsabilidade por custos, investimentos, materiais, deslocamentos ou similares.

CLÁUSULA SEXTA – DA CONFIDENCIALIDADE
O(A) CONTRATADO(A) se compromete a manter sigilo sobre todas as informações de clientes, propostas e estratégias comerciais da CONTRATANTE, sendo vedada a utilização dessas informações para fins alheios ao presente contrato.

CLÁUSULA SÉTIMA – DA VIGÊNCIA E RESCISÃO
O presente contrato terá vigência por prazo indeterminado, podendo ser rescindido a qualquer momento por qualquer das partes, mediante comunicação por escrito ou meio eletrônico, sem necessidade de justificativa e sem ônus de multa.

CLÁUSULA OITAVA – DO FORO
Fica eleito o foro da Comarca de São Paulo/SP, com renúncia expressa de qualquer outro, para dirimir eventuais conflitos oriundos deste contrato.

E, por estarem assim justos e contratados, firmam o presente contrato em meio eletrônico, reconhecendo a validade jurídica de sua assinatura digital, nos termos da legislação brasileira (Medida Provisória 2.200-2/2001 e Lei nº 14.063/2020).

ASSINATURA DIGITAL:
[Nome da Assinatura Digital]
`;

export const MARITAL_STATUS_MAP: { [key: string]: string } = {
    'Single': 'Solteiro(a)',
    'Married': 'Casado(a)',
    'Divorced': 'Divorciado(a)',
    'Widowed': 'Viúvo(a)'
};