import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldIcon, DollarSignIcon, ZapIcon } from '../components/Icons';

const HomePage: React.FC = () => {
    const navigate = useNavigate();

    const advantages = [
        {
            icon: <ShieldIcon className="h-10 w-10 text-indigo-600" />,
            title: "Produtos de Qualidade",
            description: "Ofereça os melhores seguros do mercado, com ampla cobertura e credibilidade.",
        },
        {
            icon: <DollarSignIcon className="h-10 w-10 text-indigo-600" />,
            title: "Comissões Atrativas",
            description: "Receba comissões competitivas e bonificações por performance.",
        },
        {
            icon: <ZapIcon className="h-10 w-10 text-indigo-600" />,
            title: "Agilidade e Suporte",
            description: "Conte com uma plataforma intuitiva e uma equipe de suporte dedicada para te ajudar.",
        },
    ];

    return (
        <div className="bg-white">
            {/* Hero Section */}
            <section className="relative bg-indigo-50 py-20 md:py-32">
                <div className="container mx-auto px-6 text-center">
                    <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight">
                        Transforme sua rede de contatos em <span className="text-indigo-600">renda</span>
                    </h1>
                    <p className="mt-4 text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
                        Seja um parceiro LIV VENDAS e tenha acesso a um portfólio completo de seguros para oferecer aos seus clientes, com as melhores comissões do mercado.
                    </p>
                    <button
                        onClick={() => navigate('/register')}
                        className="mt-8 px-8 py-3 text-lg font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                    >
                        Quero ser um Parceiro
                    </button>
                </div>
            </section>

            {/* Advantages Section */}
            <section id="vantagens" className="py-20">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Vantagens de ser um Parceiro LIV</h2>
                        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">Nossa plataforma foi desenhada para impulsionar seus resultados e facilitar seu dia a dia.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {advantages.map((advantage, index) => (
                            <div key={index} className="bg-gray-50 p-8 rounded-lg shadow-sm hover:shadow-lg hover:bg-white transition-all duration-300">
                                <div className="flex justify-center items-center h-20 w-20 bg-indigo-100 rounded-full mx-auto mb-6">
                                    {advantage.icon}
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 text-center">{advantage.title}</h3>
                                <p className="mt-2 text-gray-600 text-center">{advantage.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            
            {/* Commission Section */}
            <section id="comissao" className="bg-gray-50 py-20">
                 <div className="container mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Modelo de Comissão Transparente</h2>
                        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">Garantimos um sistema de comissionamento claro, justo e muito recompensador.</p>
                    </div>
                    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
                            <h3 className="text-3xl font-bold text-indigo-600">100%</h3>
                            <p className="mt-2 text-xl font-semibold text-gray-800">Seguro de Vida Tradicional</p>
                            <p className="mt-3 text-gray-600">Receba o valor integral da primeira parcela paga pelo cliente que você indicou. Uma recompensa direta e imediata pelo seu esforço.</p>
                        </div>
                         <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
                            <h3 className="text-3xl font-bold text-indigo-600">100%</h3>
                            <p className="mt-2 text-xl font-semibold text-gray-800">Seguro Saúde</p>
                            <p className="mt-3 text-gray-600">Ganhe o valor total da primeira mensalidade em produtos de saúde, um dos mais procurados do mercado, com alta demanda e aceitação.</p>
                        </div>
                        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
                            <h3 className="text-3xl font-bold text-indigo-600">50%</h3>
                            <p className="mt-2 text-xl font-semibold text-gray-800">Seguro de Vida Resgatável</p>
                            <p className="mt-3 text-gray-600">Ganhe metade do valor da primeira parcela em produtos que oferecem a opção de resgate, garantindo uma excelente remuneração.</p>
                        </div>
                    </div>
                 </div>
            </section>

            {/* Call to Action Section */}
            <section className="bg-indigo-600 text-white py-20">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold">Pronto para Começar?</h2>
                    <p className="mt-4 text-indigo-100 max-w-2xl mx-auto">Junte-se a uma rede de parceiros de sucesso. O processo de cadastro é rápido e simples.</p>
                     <button
                        onClick={() => navigate('/register')}
                        className="mt-8 px-8 py-3 text-lg font-semibold text-indigo-600 bg-white rounded-lg hover:bg-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                    >
                        Cadastre-se Agora
                    </button>
                </div>
            </section>
        </div>
    );
};

export default HomePage;