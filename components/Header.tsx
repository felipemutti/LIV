import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LogoIcon, MenuIcon, XIcon } from './Icons';

const Header: React.FC = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        setIsMenuOpen(false);
        navigate('/');
    };
    
    const handleNav = (path: string) => {
        setIsMenuOpen(false);
        navigate(path);
    }
    
    const handleAnchorNav = (selector: string) => {
        setIsMenuOpen(false);
        if (window.location.hash.slice(1) === '' && window.location.pathname === '/') {
             document.querySelector(selector)?.scrollIntoView({ behavior: 'smooth' });
        } else {
            navigate('/');
            setTimeout(() => {
                document.querySelector(selector)?.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        }
    }


    return (
        <header className="bg-white shadow-sm sticky top-0 z-50">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <Link to="/" className="flex items-center space-x-2" onClick={() => setIsMenuOpen(false)}>
                    <LogoIcon className="h-8 w-auto text-indigo-600" />
                    <span className="text-2xl font-bold text-gray-800 tracking-tight">
                        LIV <span className="text-indigo-600">VENDAS</span>
                    </span>
                </Link>
                
                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center space-x-8">
                    <button onClick={() => handleAnchorNav('#')} className="text-gray-600 hover:text-indigo-600 transition-colors duration-300">Início</button>
                    <button onClick={() => handleAnchorNav('#vantagens')} className="text-gray-600 hover:text-indigo-600 transition-colors duration-300">Vantagens</button>
                    <button onClick={() => handleAnchorNav('#comissao')} className="text-gray-600 hover:text-indigo-600 transition-colors duration-300">Comissão</button>
                </nav>

                {/* Desktop Actions */}
                <div className="hidden md:flex items-center space-x-4">
                    {user ? (
                        <>
                            <span className="text-sm text-gray-600">Olá, {user.name.split(' ')[0]}</span>
                            <button
                                onClick={() => navigate(user.isAdmin ? '/admin' : '/dashboard')}
                                className="px-4 py-2 text-sm font-semibold text-indigo-600 border border-indigo-600 rounded-lg hover:bg-indigo-600 hover:text-white transition-all duration-300"
                            >
                                {user.isAdmin ? 'Painel Admin' : 'Portal'}
                            </button>
                            <button
                                onClick={handleLogout}
                                className="px-4 py-2 text-sm font-semibold bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all duration-300"
                            >
                                Sair
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={() => navigate('/login')}
                                className="px-4 py-2 text-sm font-semibold text-indigo-600 rounded-lg hover:bg-indigo-50 transition-all duration-300"
                            >
                                Login
                            </button>
                            <button
                                onClick={() => navigate('/register')}
                                className="px-5 py-2.5 text-sm font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 shadow-sm hover:shadow-md transition-all duration-300"
                            >
                                Seja um Parceiro
                            </button>
                        </>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
                        {isMenuOpen ? <XIcon className="h-6 w-6 text-gray-700" /> : <MenuIcon className="h-6 w-6 text-gray-700" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-white shadow-lg absolute top-full left-0 w-full">
                    <div className="px-6 pt-2 pb-6 space-y-4">
                        <button onClick={() => handleAnchorNav('#')} className="block w-full text-left text-gray-700 hover:text-indigo-600 transition-colors">Início</button>
                        <button onClick={() => handleAnchorNav('#vantagens')} className="block w-full text-left text-gray-700 hover:text-indigo-600 transition-colors">Vantagens</button>
                        <button onClick={() => handleAnchorNav('#comissao')} className="block w-full text-left text-gray-700 hover:text-indigo-600 transition-colors">Comissão</button>
                        
                        <div className="border-t border-gray-200 pt-4 space-y-4">
                             {user ? (
                                <>
                                    <button
                                        onClick={() => handleNav(user.isAdmin ? '/admin' : '/dashboard')}
                                        className="w-full text-left px-4 py-2 text-md font-semibold text-indigo-600 border border-indigo-600 rounded-lg hover:bg-indigo-600 hover:text-white transition-all duration-300"
                                    >
                                        {user.isAdmin ? 'Painel Admin' : 'Portal'}
                                    </button>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full text-left px-4 py-2 text-md font-semibold bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all duration-300"
                                    >
                                        Sair
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button
                                        onClick={() => handleNav('/login')}
                                        className="w-full text-left px-4 py-2 text-md font-semibold text-indigo-600 rounded-lg hover:bg-indigo-50 transition-all duration-300"
                                    >
                                        Login
                                    </button>
                                    <button
                                        onClick={() => handleNav('/register')}
                                        className="w-full text-white bg-indigo-600 px-5 py-2.5 text-md font-semibold rounded-lg hover:bg-indigo-700 shadow-sm hover:shadow-md transition-all duration-300"
                                    >
                                        Seja um Parceiro
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;