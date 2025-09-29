import React, { useState, useMemo } from 'react';
import { useData } from '../contexts/DataContext';
import { User, Lead } from '../types';
import { CONTRACT_TEXT, MARITAL_STATUS_MAP } from '../constants';

const AdminDashboardPage: React.FC = () => {
    const {
        users,
        leads,
        loading,
        updatePartnerStatus,
        updateLead,
    } = useData();
    
    const [activeTab, setActiveTab] = useState('partners');
    
    // State for modals
    const [isPartnerModalOpen, setPartnerModalOpen] = useState(false);
    const [isLeadModalOpen, setLeadModalOpen] = useState(false);
    
    const [selectedPartner, setSelectedPartner] = useState<User | null>(null);
    const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

    // State for forms within modals
    const [currentLeadStatus, setCurrentLeadStatus] = useState<Lead['status']>('Pendente');
    const [currentLeadCommission, setCurrentLeadCommission] = useState<number | undefined>(undefined);
    
    const allPartners = useMemo(() => users.filter(user => !user.isAdmin).sort((a,b) => new Date(b.registrationDate).getTime() - new Date(a.registrationDate).getTime()), [users]);
    const allLeadsSorted = useMemo(() => [...leads].sort((a, b) => new Date(b.registrationDate).getTime() - new Date(a.registrationDate).getTime()), [leads]);

    // Handlers for opening modals
    const handleOpenPartnerDetails = (partner: User) => {
        setSelectedPartner(partner);
        setPartnerModalOpen(true);
    };

    const handleOpenLeadManager = (lead: Lead) => {
        setSelectedLead(lead);
        setCurrentLeadStatus(lead.status);
        setCurrentLeadCommission(lead.commission);
        setLeadModalOpen(true);
    };

    // Handlers for form submissions in modals
    const handleUpdateLead = async () => {
        if (selectedLead) {
            await updateLead(selectedLead.id, currentLeadStatus, currentLeadCommission);
        }
        setLeadModalOpen(false);
    };

    const getPopulatedContract = (partner: User) => {
        let populatedContract = CONTRACT_TEXT;
        const maritalStatusInPortuguese = MARITAL_STATUS_MAP[partner.maritalStatus] || '__________________';
        populatedContract = populatedContract.replace(/\[Nome completo do\(a\) Contratado\(a\)\]/g, partner.name || '__________________');
        populatedContract = populatedContract.replace(/\[estado civil\]/g, maritalStatusInPortuguese);
        populatedContract = populatedContract.replace(/\[profissão\]/g, partner.profession || '__________________');
        populatedContract = populatedContract.replace(/\[CPF\]/g, partner.cpf || '__________________');
        populatedContract = populatedContract.replace(/\[RG\]/g, partner.rg || '__________________');
        populatedContract = populatedContract.replace(/\[endereço completo\]/g, partner.address || '__________________');
        populatedContract = populatedContract.replace(/\[Nome da Assinatura Digital\]/g, partner.signature || '__________________');
        return populatedContract;
    };


    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="container mx-auto p-4 sm:p-6 lg:p-8">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Painel do Administrador</h1>
                    <p className="text-gray-600 mt-1">Gerencie parceiros e indicações.</p>
                </header>

                {/* Tabs */}
                <div className="mb-6 border-b border-gray-200">
                    <nav className="-mb-px flex space-x-6" aria-label="Tabs">
                        <button onClick={() => setActiveTab('partners')} className={`${activeTab === 'partners' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}>
                            Parceiros ({allPartners.length})
                        </button>
                        <button onClick={() => setActiveTab('leads')} className={`${activeTab === 'leads' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}>
                            Indicações ({allLeadsSorted.length})
                        </button>
                    </nav>
                </div>

                {/* Content */}
                {loading ? <div className="text-center p-8">Carregando...</div> :
                <div className="bg-white p-6 rounded-lg shadow-md">
                   {activeTab === 'partners' && (
                        <div>
                             <h2 className="text-xl font-bold text-gray-800 mb-4">Gerenciamento de Parceiros</h2>
                             <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Parceiro</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ações</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {allPartners.map(partner => (
                                            <tr key={partner.id}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium text-gray-900">{partner.name}</div>
                                                    <div className="text-sm text-gray-500">{partner.email}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <select
                                                        value={partner.status}
                                                        onChange={(e) => updatePartnerStatus(partner.id, e.target.value as User['status'])}
                                                        className="p-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                                    >
                                                        <option className="text-black bg-white" value="Pending">Pendente</option>
                                                        <option className="text-black bg-white" value="Approved">Aprovado</option>
                                                        <option className="text-black bg-white" value="Rejected">Rejeitado</option>
                                                    </select>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                                    <button onClick={() => handleOpenPartnerDetails(partner)} className="text-indigo-600 hover:text-indigo-900">Ver Detalhes</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                             </div>
                        </div>
                   )}
                   {activeTab === 'leads' && (
                        <div>
                            <h2 className="text-xl font-bold text-gray-800 mb-4">Gerenciamento de Indicações</h2>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cliente</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Parceiro</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Comissão</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ação</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {allLeadsSorted.map(lead => (
                                            <tr key={lead.id}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{lead.clientName}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{lead.partnerName}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{lead.status}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-semibold">{lead.commission ? lead.commission.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : '---'}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <button onClick={() => handleOpenLeadManager(lead)} className="text-indigo-600 hover:text-indigo-900">Gerenciar</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                   )}
                </div>
                }
            </div>
            
            {/* Modals */}
            {isPartnerModalOpen && selectedPartner && (
                 <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
                    <div className="bg-white p-6 sm:p-8 rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
                        <h3 className="text-2xl font-bold mb-4 text-gray-800">Detalhes do Parceiro</h3>
                        <div className="space-y-2 text-sm text-gray-700 mb-6">
                            <p><strong>Nome:</strong> {selectedPartner.name}</p>
                            <p><strong>Email:</strong> {selectedPartner.email}</p>
                            <p><strong>CPF:</strong> {selectedPartner.cpf}</p>
                            <p><strong>RG:</strong> {selectedPartner.rg}</p>
                            <p><strong>Endereço:</strong> {selectedPartner.address}</p>
                            <p><strong>Profissão:</strong> {selectedPartner.profession}</p>
                            <p><strong>Estado Civil:</strong> {selectedPartner.maritalStatus}</p>
                        </div>
                         <h4 className="text-lg font-bold mb-2 text-gray-800">Contrato Assinado</h4>
                         <div className="bg-gray-50 p-4 rounded-md border border-gray-200 text-gray-800">
                             <pre className="whitespace-pre-wrap text-xs font-sans">{getPopulatedContract(selectedPartner)}</pre>
                         </div>
                        <button onClick={() => setPartnerModalOpen(false)} className="mt-6 w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700">Fechar</button>
                    </div>
                </div>
            )}
            
            {isLeadModalOpen && selectedLead && (
                 <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
                    <div className="bg-white p-8 rounded-lg shadow-xl max-w-lg w-full">
                        <h3 className="text-2xl font-bold mb-4 text-gray-800">Gerenciar Indicação</h3>
                        <p className="mb-4 text-gray-600">Cliente: <span className="font-semibold">{selectedLead.clientName}</span></p>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Status</label>
                                <select value={currentLeadStatus} onChange={(e) => setCurrentLeadStatus(e.target.value as Lead['status'])} className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                                    <option className="text-black bg-white" value="Pendente">Pendente</option>
                                    <option className="text-black bg-white" value="Em Negociação">Em Negociação</option>
                                    <option className="text-black bg-white" value="Convertido">Convertido</option>
                                    <option className="text-black bg-white" value="Não Convertido">Não Convertido</option>
                                    <option className="text-black bg-white" value="Comissão Paga">Comissão Paga</option>
                                </select>
                            </div>
                            {(currentLeadStatus === 'Convertido' || currentLeadStatus === 'Comissão Paga') && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Valor da Comissão (R$)</label>
                                    <input type="number" value={currentLeadCommission || ''} onChange={(e) => setCurrentLeadCommission(Number(e.target.value))} className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="Ex: 1250.50" />
                                </div>
                            )}
                        </div>
                        <div className="mt-6 flex justify-end space-x-3">
                            <button onClick={() => setLeadModalOpen(false)} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">Cancelar</button>
                            <button onClick={handleUpdateLead} className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">Salvar</button>
                        </div>
                    </div>
                </div>
            )}
            
        </div>
    );
};

export default AdminDashboardPage;