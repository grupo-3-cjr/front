"use client"


export default function CriarLoja() {
  return (
    <div className="flex flex-col items-center z-50 bg-[#EDEDED] w-[550px] min-h-[700px]">
      <h1>Adicionar Loja</h1>

      <input className="bg-white rounded-full p-2 w-64" type="text" placeholder="Nome da loja" />

      <select>
        <option value="">Selecione uma categoria</option>
      </select>

    </div>
  );
}