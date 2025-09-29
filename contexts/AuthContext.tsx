import React, { createContext, useState, useContext, ReactNode } from 'react';
import { User } from '../types';
import { useData } from './DataContext';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<User>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const { users } = useData(); // Get users from DataContext to perform login

  const login = async (email: string, password: string): Promise<User> => {
    setLoading(true);
    await new Promise(res => setTimeout(res, 500));

    const foundUser = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    setLoading(false);

    if (foundUser) {
        if (!foundUser.isAdmin && foundUser.status !== 'Approved') {
            throw new Error('Seu cadastro está pendente de aprovação ou foi rejeitado.');
        }
        const userToAuth = { ...foundUser };
        delete userToAuth.password;
        setUser(userToAuth);
        return userToAuth;
    } else {
        throw new Error('E-mail ou senha inválidos.');
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};