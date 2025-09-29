import React from 'react';
import { Link } from 'react-router-dom';

const ResetPasswordPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Função Indisponível
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        A redefinição de senha não está habilitada nesta versão.
                    </p>
                </div>
                <div className="text-center mt-6">
                    <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                       Voltar para o Login
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ResetPasswordPage;