"use client"

import UploadField from "./UploadField";

export default function CriarLoja() {
  return (
    <div className="flex flex-col items-center z-50 bg-[#EDEDED] w-[550px] min-h-[650px] gap-4 rounded-xl">
      <h1 className="text-black font-League Spartan font-bold text-2xl pt-4">Adicionar Loja</h1>

      <input className="bg-white rounded-full p-2 w-96 h-8 px-5 text-xs outline-none" type="text" placeholder="Nome da loja" />

      {/* categoria */}
      <select className="bg-white rounded-full px-5 h-8 text-xs outline-none w-96 pr-2" name="Categoria" id="">
        <option value="">Categoria</option>
      </select>

      <UploadField label="Anexe a foto de perfil de sua loja" />

      <UploadField label="Anexe a logo em SVG de sua loja" />

      <UploadField label="Anexe o banner de sua loja" />
    </div>
  );
}