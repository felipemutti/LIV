import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../contexts/DataContext';
import { CONTRACT_TEXT, MARITAL_STATUS_MAP } from '../constants';

const RegisterPage: React.FC = () => {
    const { addUser } = useData();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        cpf: '',
        rg: '',
        profession: '',
        maritalStatus: '',
        address: '',
    });
    const [signature, setSignature] = useState('');
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [isContractModalOpen, setContractModalOpen] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const getPopulatedContract = () => {
        let populatedContract = CONTRACT_TEXT;
        const maritalStatusInPortuguese = MARITAL_STATUS_MAP[formData.maritalStatus] || '__________________';
        populatedContract = populatedContract.replace(/\[Nome completo do\(a\) Contratado\(a\)\]/g, formData.name || '__________________');
        populatedContract = populatedContract.replace(/\[estado civil\]/g, maritalStatusInPortuguese);
        populatedContract = populatedContract.replace(/\[profissão\]/g, formData.profession || '__________________');
        populatedContract = populatedContract.replace(/\[CPF\]/g, formData.cpf || '__________________');
        populatedContract = populatedContract.replace(/\[RG\]/g, formData.rg || '__________________');
        populatedContract = populatedContract.replace(/\[endereço completo\]/g, formData.address || '__________________');
        populatedContract = populatedContract.replace(/\[Nome da Assinatura Digital\]/g, signature || '__________________');
        return populatedContract;
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccessMessage('');

        if (formData.password !== formData.confirmPassword) {
            setError('As senhas não coincidem.');
            setLoading(false);
            return;
        }
        if (formData.password.length < 6) {
             setError('A senha deve ter no mínimo 6 caracteres.');
             setLoading(false);
             return;
        }
        if (!termsAccepted || !signature) {
            setError('Você deve assinar e aceitar os termos do contrato para continuar.');
            setLoading(false);
            return;
        }
        
        try {
            await addUser({
                name: formData.name,
                email: formData.email,
                password: formData.password,
                cpf: formData.cpf,
                rg: formData.rg,
                profession: formData.profession,
                maritalStatus: formData.maritalStatus as any,
                address: formData.address,
                signature: signature,
            });

            setSuccessMessage("Cadastro recebido! Seus dados foram enviados para análise. Você será notificado quando seu acesso for aprovado.");

        } catch (err: any) {
            setError(err.message || 'Ocorreu um erro ao processar seu cadastro.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Torne-se um Parceiro</h2>
                    <p className="mt-2 text-center text-sm text-gray-600">Preencha o formulário para iniciar sua jornada conosco.</p>
                </div>
                { !successMessage ? (
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                             <input type="text" name="name" placeholder="Nome Completo" required onChange={handleChange} value={formData.name} className="input-style" />
                             <input type="email" name="email" placeholder="E-mail" required onChange={handleChange} value={formData.email} className="input-style" />
                             <input type="password" name="password" placeholder="Senha (mínimo 6 caracteres)" required onChange={handleChange} value={formData.password} className="input-style" />
                             <input type="password" name="confirmPassword" placeholder="Confirmar Senha" required onChange={handleChange} value={formData.confirmPassword} className="input-style" />
                             <input type="text" name="cpf" placeholder="CPF" required onChange={handleChange} value={formData.cpf} className="input-style" />
                             <input type="text" name="rg" placeholder="RG" required onChange={handleChange} value={formData.rg} className="input-style" />
                             <input type="text" name="profession" placeholder="Profissão" required onChange={handleChange} value={formData.profession} className="input-style" />
                             <select name="maritalStatus" required onChange={handleChange} value={formData.maritalStatus} className="input-style">
                                 <option value="">Estado Civil</option>
                                 <option value="Single">Solteiro(a)</option>
                                 <option value="Married">Casado(a)</option>
                                 <option value="Divorced">Divorciado(a)</option>
                                 <option value="Widowed">Viúvo(a)</option>
                             </select>
                             <input type="text" name="address" placeholder="Endereço Completo" required onChange={handleChange} value={formData.address} className="md:col-span-2 input-style" />
                             <div className="md:col-span-2">
                                <input type="text" name="signature" placeholder="Assinatura Digital (Digite seu nome completo)" required onChange={(e) => setSignature(e.target.value)} value={signature} className="input-style" />
                             </div>
                        </div>

                        <div className="flex items-center">
                            <input id="terms" name="terms" type="checkbox" checked={termsAccepted} onChange={(e) => setTermsAccepted(e.target.checked)} className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                            <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
                                Li e aceito os termos do{' '}
                                <button type="button" onClick={() => setContractModalOpen(true)} className="font-medium text-indigo-600 hover:text-indigo-500">
                                    contrato de parceria
                                </button>.
                            </label>
                        </div>

                        {error && <p className="text-sm text-red-600 text-center col-span-2">{error}</p>}
                        
                        <div>
                            <button type="submit" disabled={loading || !termsAccepted || !signature} className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400 disabled:cursor-not-allowed">
                                {loading ? 'Enviando...' : 'Finalizar Cadastro'}
                            </button>
                        </div>
                        <p className="mt-2 text-center text-sm text-gray-600">
                            Já tem uma conta?{' '}
                            <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">Faça login</Link>
                        </p>
                    </form>
                ) : (
                    <div className="text-center p-6 bg-green-50 rounded-lg">
                        <p className="text-lg font-semibold text-green-800">{successMessage}</p>
                        <Link to="/login" className="mt-4 inline-block font-medium text-indigo-600 hover:text-indigo-500">Ir para o Login</Link>
                    </div>
                )}
            </div>

            {isContractModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
                    <div className="bg-white p-6 sm:p-8 rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
                        <h3 className="text-2xl font-bold mb-4 text-gray-800">Contrato de Prestação de Serviços</h3>
                        <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                             <pre className="whitespace-pre-wrap text-xs sm:text-sm text-gray-700 font-sans">
                                {getPopulatedContract()}
                            </pre>
                        </div>
                        <button onClick={() => setContractModalOpen(false)} className="mt-6 w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Fechar
                        </button>
                    </div>
                </div>
            )}

            <style>{`
                .input-style {
                    appearance: none;
                    position: relative;
                    display: block;
                    width: 100%;
                    padding: 0.75rem;
                    border: 1px solid #D1D5DB;
                    placeholder-color: #6B7280;
                    color: #111827;
                    background-color: white;
                    border-radius: 0.375rem;
                    outline: none;
                }
                .input-style:focus {
                    --tw-ring-color: #4F46E5;
                     border-color: #4F46E5;
                     box-shadow: 0 0 0 1px #4F46E5;
                }
            `}</style>
        </div>
    );
};

export default RegisterPage;