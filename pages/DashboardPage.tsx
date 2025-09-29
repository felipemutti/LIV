import React, { useState, useMemo } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
import { Lead } from '../types';

const DashboardPage: React.FC = () => {
    const { user } = useAuth();
    const { leads, addLead, loading: dataLoading } = useData();
    const [copied, setCopied] = useState(false);

    const [clientName, setClientName] = useState('');
    const [clientContact, setClientContact] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const myLeads = useMemo(() => {
        if (!user) return [];
        return leads.filter(lead => lead.partnerId === user.id);
    }, [user, leads]);

    const commissionsToReceive = useMemo(() => {
        return myLeads
            .filter(lead => lead.status === 'Convertido' && lead.commission)
            .reduce((sum, lead) => sum + lead.commission!, 0);
    }, [myLeads]);
    
    const totalReceived = useMemo(() => {
        return myLeads
            .filter(lead => lead.status === 'Comissão Paga' && lead.commission)
            .reduce((sum, lead) => sum + lead.commission!, 0);
    }, [myLeads]);

    const openLeads = myLeads.filter(lead => lead.status !== 'Comissão Paga').sort((a, b) => new Date(b.registrationDate).getTime() - new Date(a.registrationDate).getTime());
    const paidLeads = myLeads.filter(lead => lead.status === 'Comissão Paga').sort((a, b) => {
        if (!a.paymentDate || !b.paymentDate) return 0;
        return new Date(b.paymentDate).getTime() - new Date(a.paymentDate).getTime()
    });

    const handleSubmitLead = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) {
            setError('Usuário não autenticado.');
            return;
        }
        setLoading(true);
        setError('');
        setSuccessMessage('');

        try {
            await addLead({ clientName, clientContact }, user.id, user.name);
            setSuccessMessage('Lead enviado com sucesso! Acompanhe o status abaixo.');
            setClientName('');
            setClientContact('');
        } catch (err) {
            setError('Falha ao enviar o lead. Tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    const whatsAppText = `Olá [Nome do Contato], tudo bem?\n\nEspero que sim! 😊\n\nQueria te contar uma novidade: agora sou parceiro da Icatu Seguros, a maior seguradora independente do Brasil.\n\nMeu objetivo é simples: garantir que você e sua família tenham a proteção financeira que merecem.\n\nPara isso, tenho duas opções rápidas:\n\nAgendar um bate-papo rápido com um especialista em proteção financeira para entender suas necessidades e apresentar um resumo do que podemos fazer.\n\nAutorizar o contato direto de um especialista Icatu para uma conversa sem compromisso sobre planejamento de proteção familiar.\n\nQual opção você prefere para darmos esse passo rumo à sua tranquilidade? Agendar a conversa ou autorizar o especialista?\n\nAbraços,\n[Seu Nome]`;

    const copyToClipboard = () => {
        navigator.clipboard.writeText(whatsAppText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };
    
    const getStatusChip = (status: Lead['status']) => {
        const baseClasses = "px-3 py-1 text-xs font-semibold rounded-full";
        switch (status) {
            case 'Convertido':
                return `${baseClasses} bg-green-100 text-green-800`;
            case 'Em Negociação':
                return `${baseClasses} bg-blue-100 text-blue-800`;
            case 'Pendente':
                return `${baseClasses} bg-yellow-100 text-yellow-800`;
            case 'Comissão Paga':
                 return `${baseClasses} bg-purple-100 text-purple-800`;
            case 'Não Convertido':
                 return `${baseClasses} bg-red-100 text-red-800`;
            default:
                return `${baseClasses} bg-gray-100 text-gray-800`;
        }
    };
    
    if (!user || dataLoading) {
        return <div className="text-center p-8">Carregando dados do parceiro...</div>;
    }

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="container mx-auto p-4 sm:p-6 lg:p-8">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Seu Portal do Parceiro</h1>
                    <p className="text-gray-600 mt-1">Bem-vindo(a) de volta, {user.name}!</p>
                </header>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-sm font-medium text-gray-500">Comissões a Receber</h3>
                        <p className="text-3xl font-bold text-indigo-600">{commissionsToReceive.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                    </div>
                     <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-sm font-medium text-gray-500">Total Recebido</h3>
                        <p className="text-3xl font-bold text-green-600">{totalReceived.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-sm font-medium text-gray-500">Indicações em Aberto</h3>
                        <p className="text-3xl font-bold text-gray-800">{openLeads.length}</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Add Lead Form & WhatsApp Script */}
                    <div className="lg:col-span-1 space-y-8">
                        <div className="bg-white p-6 rounded-lg shadow-md h-fit">
                            <h2 className="text-xl font-bold text-gray-800 mb-4">Indicar um Cliente</h2>
                            <p className="text-sm text-gray-600 mb-4 bg-yellow-50 p-3 rounded-md border border-yellow-200">
                                <strong>Aviso:</strong> Indique apenas clientes que foram previamente contatados e estão cientes de que receberão o contato de um corretor.
                            </p>
                            <form onSubmit={handleSubmitLead} className="space-y-4">
                                <div>
                                    <label htmlFor="clientName" className="block text-sm font-medium text-gray-700">Nome do Cliente</label>
                                    <input type="text" id="clientName" value={clientName} onChange={e => setClientName(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white text-gray-900" />
                                </div>
                                <div>
                                    <label htmlFor="clientContact" className="block text-sm font-medium text-gray-700">Contato (Telefone)</label>
                                    <input type="text" id="clientContact" value={clientContact} onChange={e => setClientContact(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white text-gray-900" />
                                </div>
                                
                                {error && <p className="text-sm text-red-600">{error}</p>}
                                {successMessage && <p className="text-sm text-green-600">{successMessage}</p>}
                                
                                <button type="submit" disabled={loading} className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400">
                                    {loading ? 'Enviando...' : 'Enviar Indicação'}
                                </button>
                            </form>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md h-fit">
                            <h2 className="text-xl font-bold text-gray-800 mb-4">Sugestão de Texto para WhatsApp</h2>
                            <div className="bg-gray-100 p-4 rounded-md text-sm text-gray-700 whitespace-pre-wrap border border-gray-200">
                                {whatsAppText}
                            </div>
                            <button onClick={copyToClipboard} className="mt-4 w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-300">
                                {copied ? 'Copiado!' : 'Copiar Texto'}
                            </button>
                        </div>
                    </div>

                    {/* Leads Table */}
                    <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">Indicações em Aberto</h2>
                         <div className="overflow-x-auto mb-8">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data de Envio</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Comissão</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {openLeads.length > 0 ? (
                                        openLeads.map(lead => (
                                            <tr key={lead.id}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium text-gray-900">{lead.clientName}</div>
                                                    <div className="text-sm text-gray-500">{lead.clientContact}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(lead.registrationDate).toLocaleDateString('pt-BR')}</td>
                                                <td className="px-6 py-4 whitespace-nowrap"><span className={getStatusChip(lead.status)}>{lead.status}</span></td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                                                    {lead.commission ? lead.commission.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : '---'}
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={4} className="px-6 py-4 text-center text-sm text-gray-500">Nenhuma indicação em aberto.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        <h2 className="text-xl font-bold text-gray-800 mb-4">Histórico de Comissões Pagas</h2>
                         <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente / Valor Pago</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data do Pagamento</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {paidLeads.length > 0 ? (
                                        paidLeads.map(lead => (
                                            <tr key={lead.id}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium text-gray-900">{lead.clientName}</div>
                                                    <div className="text-sm font-semibold text-green-600">
                                                        {lead.commission ? lead.commission.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : '---'}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{lead.paymentDate ? new Date(lead.paymentDate).toLocaleDateString('pt-BR') : 'N/A'}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={2} className="px-6 py-4 text-center text-sm text-gray-500">Nenhum pagamento recebido ainda.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;