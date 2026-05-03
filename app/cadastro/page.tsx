import "tailwindcss";

export default function Cadastro() {
  return (
      // Fundo bege claro da tela inteira
      <div className="min-h-screen bg-[#f3f0e1] flex px-8 md:px-16 lg:px-24">
        
            //a div que vai organizar o lado esquerdo com formulario e o lado direito com as imagens
          <div className="w-full flex flex-col md:flex-row justify-between items-end gap-8 pt-30">
            

              //O Formulário no lado esquerdo 
            <div className="w-full md:w-[60%] xl:w-[35%] bg-[#171918] rounded-t-[40px] p-10 lg:p-24 shadow-2xl flex flex-col">
                

            </div>

              //A imagem e o titulo no lado direito
            <div className="hidden md:flex w-full md:w-[55%] flex-col items-center justify-center">

            </div>

          </div>
      </div>
  );
}
