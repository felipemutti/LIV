import React, { createContext, useState, useContext, ReactNode } from 'react';
import { User, Lead } from '../types';
import { USERS_MOCK, LEADS_MOCK } from '../constants';

interface DataContextType {
    users: User[];
    leads: Lead[];
    loading: boolean;
    addUser: (userData: Omit<User, 'id' | 'status' | 'isAdmin' | 'registrationDate'>) => Promise<User>;
    updatePartnerStatus: (partnerId: string, status: User['status']) => Promise<void>;
    updateLead: (leadId: string, status: Lead['status'], commission?: number) => Promise<void>;
    addLead: (leadData: { clientName: string; clientContact: string }, partnerId: string, partnerName: string) => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [users, setUsers] = useState<User[]>(USERS_MOCK);
    const [leads, setLeads] = useState<Lead[]>(LEADS_MOCK);
    const [loading] = useState(false); // Mock data is always available

    const addUser = async (userData: Omit<User, 'id' | 'status' | 'isAdmin' | 'registrationDate'>): Promise<User> => {
        // Simulate async operation
        await new Promise(res => setTimeout(res, 500));
        
        if (users.some(u => u.email.toLowerCase() === userData.email.toLowerCase())) {
            throw new Error("Este e-mail já está em uso.");
        }
        
        const newUser: User = {
            ...userData,
            id: `user-${new Date().getTime()}`,
            status: 'Pending',
            isAdmin: false,
            registrationDate: new Date().toISOString(),
        };
        
        setUsers(prevUsers => [...prevUsers, newUser]);
        return newUser;
    };

    const addLead = async (leadData: { clientName: string; clientContact: string }, partnerId: string, partnerName: string) => {
        await new Promise(res => setTimeout(res, 300));
        const newLead: Lead = {
            id: `lead-${new Date().getTime()}`,
            partnerId,
            partnerName,
            clientName: leadData.clientName,
            clientContact: leadData.clientContact,
            status: 'Pendente',
            registrationDate: new Date().toISOString(),
        };
        setLeads(prevLeads => [...prevLeads, newLead]);
    };

    const updatePartnerStatus = async (partnerId: string, status: User['status']) => {
        setUsers(prevUsers => prevUsers.map(u => u.id === partnerId ? { ...u, status } : u));
    };

    const updateLead = async (leadId: string, status: Lead['status'], commission?: number) => {
        setLeads(prevLeads => prevLeads.map(lead => {
            if (lead.id === leadId) {
                const updatedLead: Lead = { ...lead, status };
                if (status === 'Convertido' || status === 'Comissão Paga') {
                    updatedLead.commission = commission;
                } else {
                    delete updatedLead.commission;
                }
                if (status === 'Comissão Paga' && !lead.paymentDate) {
                    updatedLead.paymentDate = new Date().toISOString();
                }
                if (status !== 'Comissão Paga') {
                     delete updatedLead.paymentDate;
                }
                return updatedLead;
            }
            return lead;
        }));
    };

    const value = { users, leads, loading, addUser, updatePartnerStatus, updateLead, addLead };

    return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useData = (): DataContextType => {
    const context = useContext(DataContext);
    if (context === undefined) {
        throw new Error('useData must be used within a DataProvider');
    }
    return context;
};