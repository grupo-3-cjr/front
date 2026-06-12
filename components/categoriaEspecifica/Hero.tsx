export default function Hero() {
    return(
        <section className="bg-black text-white h-[380px] overflow-hidden">

            <div className="h-full max-w-[1218px] mx-auto flex items-center justify-between px-16">

                <div className="flex-1 flex justify-end pr-8">
                    <h1 className="text-5xl font-bold leading-[1.05] tracking-tight text-right">
                        O universo da tecnologia <br />
                        em um só lugar
                    </h1>
                </div>

                {/* Mantida a estrutura do mascote */}
                <div className="w-[42%] flex justify-center items-start h-full">
                    <img
                        className="w-[100px]"
                        src="/Mascote2.png"
                        alt="Logo hero"
                    />
                </div>

            </div>

        </section>
    )
}