export interface User {
    id: string;
    name: string;
    email: string;
    password?: string;
    cpf: string;
    rg: string;
    profession: string;
    maritalStatus: 'Single' | 'Married' | 'Divorced' | 'Widowed';
    address: string;
    status: 'Pending' | 'Approved' | 'Rejected';
    isAdmin: boolean;
    registrationDate: string;
    signature: string;
}

export interface Lead {
    id: string;
    partnerId: string;
    partnerName: string;
    clientName: string;
    clientContact: string;
    status: 'Pendente' | 'Em Negociação' | 'Convertido' | 'Não Convertido' | 'Comissão Paga';
    commission?: number;
    registrationDate: string;
    paymentDate?: string;
}