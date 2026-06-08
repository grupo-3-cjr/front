"use client";

import { X, Camera, Plus, Minus, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type EditProductModalProps = {
    isOpen: boolean;
    onClose: () => void;
    productId: number;
    parentCategoryId: number;
    // Recebendo os dados iniciais para preencher o form
    initialData: {
        title: string;
        category: string;
        description: string;
        price: string;
        stock: number;
    };
};

export default function EditProductModal({ isOpen, onClose, productId, initialData, parentCategoryId}: EditProductModalProps) {
    // Estados locais para controlar o formulário
    const [title, setTitle] = useState(initialData.title);
    const [category, setCategory] = useState(initialData.category);
    const [description, setDescription] = useState(initialData.description);
    const [price, setPrice] = useState(initialData.price);
    //dados estoque
    const [stock, setStock] = useState(initialData.stock);
    const MAX_STOCK = 999;
    const router = useRouter();

    const handleDelete = async () => {
        // Pede confirmação antes de fazer qualquer coisa
        const confirmacao = window.confirm("Tem certeza que deseja deletar este produto?");
        if (!confirmacao) return;

        try {
            const token = localStorage.getItem("token");
            const headers = {
                "Content-Type": "application/json",
                ...(token ? { Authorization: `Bearer ${token}` } : {})
            };

            const response = await fetch(`http://localhost:3001/produtos/${productId}`, {
                method: 'DELETE', 
                headers,
            });

            if (response.ok) {
                alert("Produto deletado com sucesso!");
                onClose(); 
                
                router.push("/feed"); 
            } else {
                const erro = await response.text();
                alert(`Erro ao deletar: ${erro}`);
            }

        } catch (error) {
            console.error("Erro ao deletar:", error);
            alert("Ocorreu um erro de conexão ao tentar deletar.");
        }
    };
    const [subcategorias, setSubcategorias] = useState<{id: number, name: string}[]>([]);
    useEffect(() => {
        const fetchCategorias = async () => {
            try {
                const response = await fetch("http://localhost:3001/category"); 
                
                if (response.ok) {
                    const data = await response.json();

                    const subcategoriasFil = data.filter(
                        (cat: any) => Number(cat.parent_category_id) === Number(parentCategoryId)
                    );
                    setSubcategorias(subcategoriasFil);
                }
            } catch (error) {
                console.error("Erro ao buscar categorias:", error);
            }
        };

        if (isOpen) {
            fetchCategorias();
        }
    }, [isOpen, parentCategoryId]);

    const handleSave = async () => {
        try {
            const token = localStorage.getItem("token");
            const headers = {
                "Content-Type": "application/json",
                ...(token ? { Authorization: `Bearer ${token}` } : {})
            };

            // Limpa os dados antes de enviar, ou seja, só manda numero para o back
            const precoLimpo = price.toString().replace(/[^0-9.,]/g, '').replace(',', '.');

            const categoriaEscolhida = subcategorias.find(sub => sub.name === category);
            // Monta o pacote com os dados
            const payload = {
                name: title,
                description: description,
                price: parseFloat(precoLimpo),
                stock: stock,
               ...(categoriaEscolhida && { category_id: categoriaEscolhida.id })
            
            };
            // Faz a requisição de atualização
            const response = await fetch(`http://localhost:3001/produtos/${productId}`, {
                method: 'PATCH', 
                headers,
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                alert("Produto atualizado com sucesso!");
                onClose(); 
                window.location.reload(); // Recarrega a página
            } else {
                const erro = await response.text();
                alert(`Erro ao salvar: ${erro}`);
            }

        } catch (error) {
            console.error("Erro ao atualizar:", error);
            alert("Ocorreu um erro ao tentar salvar.");
        }
    };


    const [isCategoryOpen, setIsCategoryOpen] = useState(false);

    const [previews, setPreviews] = useState<string[]>(['', '', '', '']);

    if (!isOpen) return null;
    // Função para lidar com a digitação no input de estoque
    const handleStockChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value);
        
        setStock(isNaN(value) ? 0 : Math.min(Math.max(0, value), MAX_STOCK));
    };
    // Função que gera o link temporário e guarda no estado certo
    const handleImageChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const tempUrl = URL.createObjectURL(file);
            const newPreviews = [...previews];
            newPreviews[index] = tempUrl; 
            setPreviews(newPreviews);
        }
    };
    return (
        // Overlay escuro de fundo
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            
            {/* Caixa do Modal */}
            <div className="relative w-full max-w-[750px] bg-[#EDEDED] rounded-3xl p-8 shadow-2xl flex flex-col max-h-[90vh] overflow-y-auto">
                
                {/* Botão Fechar */}
                <button onClick={onClose} className="absolute top-6 right-6 text-black hover:text-gray-600 transition">
                    <X size={32} />
                </button>

                <h2 className="text-3xl font-medium text-center text-black mb-6 mt-2">
                    Editar Produto
                </h2>

                {/* Área de Upload de Fotos */}
                <div className="flex flex-col gap-3 mb-6">
                    {/* Foto Principal */}
                    <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-[#6A38F3] rounded-2xl bg-transparent hover:bg-purple-50 transition text-[#6A38F3] relative group cursor-pointer overflow-hidden">
                        <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageChange(0, e)} />
                        
                        {/* Se tiver preview, mostra a imagem. Se não, mostra a Câmera */}
                        {previews[0] ? (
                            <img src={previews[0]} alt="Preview Principal" className="w-full h-full object-cover" />
                        ) : (
                            <>
                                <div className="relative">
                                    <Camera size={32} strokeWidth={1.5} />
                                    <div className="absolute -bottom-1 -right-2 bg-white rounded-full">
                                        <Plus size={16} strokeWidth={3} className="text-[#6A38F3]" />
                                    </div>
                                </div>
                                <span className="text-xs mt-2 font-medium text-gray-600">Anexe as fotos do seu produto</span>
                            </>
                        )}
                    </label>

                    {/* Fotos Secundárias */}
                    <div className="flex gap-3">
                        {[1, 2, 3].map((index) => (
                            <label key={index} className="flex flex-col items-center justify-center flex-1 h-20 border-2 border-dashed border-[#6A38F3] rounded-2xl bg-transparent hover:bg-purple-50 transition text-[#6A38F3] relative group cursor-pointer overflow-hidden">
                                <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageChange(index, e)} />
                                
                                {previews[index] ? (
                                    <img src={previews[index]} alt={`Preview ${index}`} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="relative">
                                        <Camera size={28} strokeWidth={1.5} />
                                        <div className="absolute -bottom-1 -right-2 bg-white rounded-full">
                                            <Plus size={14} strokeWidth={3} className="text-[#6A38F3]" />
                                        </div>
                                    </div>
                                )}
                            </label>
                        ))}
                    </div>
                </div>

                {/* Formulário */}
                <div className="flex flex-col gap-3">
                    <input 
                        type="text" 
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full bg-white text-gray-800 px-5 py-3 rounded-2xl outline-none focus:ring-2 focus:ring-[#6A38F3]"
                        placeholder="Nome do produto"
                    />

                     {/* select da subcategoria */}
                    <div className="relative w-full bg-white rounded-2xl flex flex-col focus-within:ring-2 focus-within:ring-[#6A38F3]">
                        {/* antes de clickar */}
                        <button
                            type="button"
                            onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                            className="w-full flex justify-between items-center px-5 py-3 outline-none rounded-2xl"
                        >
                            <span className={category ? "text-gray-800" : "text-gray-500"}>
                                {isCategoryOpen ? "Subcategoria" : (category || "Subcategoria")}
                            </span>
                            <ChevronDown 
                                size={20} 
                                className={`text-gray-500 transition-transform ${isCategoryOpen ? "rotate-180" : ""}`} 
                            />
                        </button>

                        {/* lista as Opções da subcategoria*/}
                        {isCategoryOpen && (
                            <div className="flex flex-col px-5 pb-4 gap-2">
                                {subcategorias.map((sub) => (
                                    <button
                                        key={sub.id}
                                        type="button"
                                        onClick={() => {
                                            setCategory(sub.name);
                                            setIsCategoryOpen(false); 
                                        }}
                                        className="flex items-center gap-2 text-[#6A38F3] hover:opacity-80 transition-opacity"
                                    >
                                        {/* Bolinha dentro  */}
                                        <div className="w-4 h-4 rounded-full border border-[#6A38F3] flex items-center justify-center">
                                            {category === sub.name && (
                                                <div className="w-2 h-2 rounded-full bg-[#6A38F3]" />
                                            )}
                                        </div>
                                        <span className="font-light">{sub.name}</span>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <textarea 
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full bg-white text-gray-800 px-5 py-3 rounded-2xl h-24 resize-none outline-none focus:ring-2 focus:ring-[#6A38F3]"
                        placeholder="Descrição do produto"
                    />

                    <input 
                        type="text" 
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="w-full bg-white text-gray-800 px-5 py-3 rounded-2xl outline-none focus:ring-2 focus:ring-[#6A38F3]"
                        placeholder="R$ 0,00"
                    />
                </div>

                {/* Botão Deletar */}
                <button 
                    onClick={handleDelete}
                    className="w-full bg-[#FF0000] text-white font-bold py-3 rounded-2xl mt-4 hover:bg-red-700 transition">
                    DELETAR
                </button>

                {/* Seletor de Quantidade */}
                <div className="flex items-center justify-center gap-8 my-6">
                    <button 
                        onClick={() => setStock(Math.max(stock - 1, 0))}
                        className="w-12 h-12 rounded-full border border-[#6A38F3] flex items-center justify-center text-[#6A38F3] hover:bg-purple-100 transition"
                    >
                        <Minus size={24} />
                    </button>
                    
                    <input 
                        type="number"
                        value={stock}
                        onChange={handleStockChange}
                        className="text-5xl font-light text-[#6A38F3] w-28 text-center bg-transparent outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                    <button 
                        
                        // Impede que o botão + passe do limite máximo
                        onClick={() => setStock(Math.min(stock + 1, MAX_STOCK))}
                        className="w-12 h-12 rounded-full border border-[#6A38F3] flex items-center justify-center text-[#6A38F3] hover:bg-purple-100 transition"
                    >

                        <Plus size={24} />
                    </button>

                </div>

                {/* Botão Salvar */}
                <button className="bg-[#6B46C1] text-white font-medium py-3 px-16 rounded-full mx-auto hover:bg-purple-800 transition"
                 onClick={handleSave}
                >
                    Salvar
                </button>

            </div>
        </div>
    );
}