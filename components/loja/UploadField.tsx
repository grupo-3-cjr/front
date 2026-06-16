"use client";

import { Upload } from "lucide-react";
import { useState } from "react";

type UploadFieldProps = {
    label: string;
    onFileSelect: (file: File) => void;
    initialPreview?: string; 
};

export default function UploadField({ label, onFileSelect, initialPreview }: UploadFieldProps) {
   const [preview, setPreview] = useState<string | null>(initialPreview || null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            onFileSelect(file); // Envia o arquivo real para o CriarLojaModal
            
            // Cria a URL temporária para mostrar a imagem no quadro
            const tempUrl = URL.createObjectURL(file);
            setPreview(tempUrl);
        }
    };

    return (
        <label className="flex flex-col items-center justify-center gap-2 border-dashed border-2 border-[#6A38F3] rounded-lg p-4 w-96 h-32 cursor-pointer hover:bg-purple-50 transition-colors relative overflow-hidden group">
            {/* O input fica escondido, mas como está dentro da <label>, clicar no quadro ativa ele */}
            <input 
                type="file" 
                accept="image/*" 
                className="hidden" 
                onChange={handleFileChange} 
            />

            {preview ? (
                // Se o usuário já escolheu uma foto, mostramos ela
                <img 
                    src={preview} 
                    alt="Preview do upload" 
                    className="w-full h-full object-contain" 
                />
            ) : (
                // Se ainda não escolheu, mostramos o ícone original
                <>
                    <Upload
                        size={36}
                        className="text-[#6A38F3] group-hover:scale-110 transition-transform"
                    />
                    <span className="text-black text-sm text-center font-light px-2">
                        {label}
                    </span>
                </>
            )}
        </label>
    );
}