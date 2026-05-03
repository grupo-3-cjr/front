import "tailwindcss";
import Image from 'next/image';

export default function Cadastro() {
  return (
      // Fundo bege claro da tela inteira
      <div className="min-h-screen bg-[#f3f0e1] flex px-8 md:px-16 lg:px-24">
        
            {/*a div que vai organizar o lado esquerdo com formulario e o lado direito com as imagens*/}
          <div className="w-full flex flex-col md:flex-row justify-between items-end gap-2 ">
            

              {/*O Formulário no lado esquerdo*/} 
            <div className="w-full md:w-[70%] xl:w-[45%] bg-[#171918] rounded-t-[40px] p-10 lg:p-30 flex flex-col">
                

            </div>

              {/*A imagem e o titulo no lado direito*/}
            <div className="hidden md:flex w-full md:w-[55%] flex-col items-end justify-center self-start gap-2.5">
                       {/* Imagem da logo no lado direito */}     
                          <Image 
                            src="/LogoStock.io.png" 
                            alt="Logo da Stock.io"
                            width={421}
                            height={267}
                            className="w-62.5 lg:w-107.5 h-auto object-contain"
                            priority
                          />
                        {/* imagem do mascote embaixo da logo */}
                        <Image 
                            src="/mascoteStack.png" 
                            alt="Mascote verde da Stock.io"
                            width={497}
                            height={1129}
                            className="max-h-[75vh] w-auto object-contain"
                            priority
                          />
            </div>

          </div>
      </div>
  );
}


