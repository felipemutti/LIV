import React from 'react';
import { LogoIcon } from './Icons';

const Footer: React.FC = () => {
    return (
        <footer className="bg-white border-t border-gray-200">
            <div className="container mx-auto px-6 py-8">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="flex items-center space-x-2 mb-4 md:mb-0">
                         <LogoIcon className="h-7 w-auto text-indigo-600" />
                        <span className="text-xl font-bold text-gray-800">
                            LIV <span className="text-indigo-600">VENDAS</span>
                        </span>
                    </div>
                    <div className="text-sm text-gray-500 text-center">
                        <p>&copy; {new Date().getFullYear()} LIV SEGUROS. Todos os direitos reservados.</p>
                        <p>FELIPE MUTTI CORRETAGEM DE SEGUROS LTDA - CNPJ: 61.319.803/0001-06</p>
                        <p>SUSEP: 252170500</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;