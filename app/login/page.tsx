export default function Login() {
  return (
    // O 'main' é o fundo da tela. 
    // 'bg-[#F5F5E9]' é a cor bege do fundo da imagem.
    <main className="flex min-h-screen items-end justify-center bg-[#F6F3E4] font-sans">
      
      {/* Esse div organiza o lado esquerdo (logo/boneco) e o lado direito (card) */}
      <div className="flex w-full max-w-[1440px] h-screen items-start justify-between px-[105px]"> 
        
        {/* LADO ESQUERDO: logo e imagem */}
        <div className="flex flex-col items-start ml-[105px] mt-[66px]">
          <h1 className="text-7xl font-black text-black leading-none w-[421px] h-[267px]">
            STOCK.I<span className="text-[#D4FF00]">O</span>
          </h1>
          {/* colocando imagem */}
          <img 
            src="/personagem.png" 
            alt="Personagem segurando caixa" 
            className="w-[450px] h-auto mt-[-30px]" 
/>
        </div>

        {/* LADO DIREITO: O Card de Login preto */}
        <div className="w-[654px] h-[calc(100vh-111px)] bg-[#1A1A1A] rounded-t-[45px] p-10 text-white shadow-2xl self-end">
          <h2 className="text-2xl font-bold text-center mb-10 uppercase tracking-widest">
            Bem vindo de volta!
          </h2>

          <form className="flex flex-col space-y-6">
            {/* Campo de Email */}
            <input 
              type="email" 
              placeholder="Email" 
              className="w-full p-4 rounded-full bg-[#EBE9D4] text-black outline-none placeholder-gray-500"
            />
            
            {/* Campo de Senha */}
            <div className="relative">
              <input 
                type="password" 
                placeholder="Senha" 
                className="w-full p-4 rounded-full bg-[#EBE9D4] text-black outline-none placeholder-gray-500"
              />
              <span className="absolute right-6 top-4 text-gray-600 cursor-pointer">👁️</span>
            </div>

            <button type="button" className="text-xs text-center text-gray-400 hover:underline">
              Esqueceu sua senha?
            </button>

            {/* Botão Roxo */}
            <button className="w-full bg-[#6A38F3] py-4 rounded-full font-bold text-lg uppercase hover:bg-opacity-90 transition-all">
              Entrar
            </button>

            <p className="text-center text-sm text-gray-400">
              Não possui uma conta? <span className="text-[#6336FF] font-bold cursor-pointer hover:underline">Cadastre-se</span>
            </p>
          </form>
        </div>

      </div>
    </main>
  );
}