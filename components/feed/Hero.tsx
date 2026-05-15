export default function Hero() {
    return(
        <section className="bg-black text-white h-[380px] overflow-hidden">

            <div className="h-full max-w-[1218px] mx-auto flex items-center justify-between px-16">

                <div className="w-[50%]">
                    <h1 className="text-5xl font-bold leading-[1.05] text-right tracking-tight">
                        Do CAOS à organização, <br />
                        em alguns cliques
                    </h1>
                </div>

                <div className="w-[42%] flex justify-start items-end h-full">
                    <img className="w-[430px] translate-y-60 -translate-x-30" src="/hero.png" alt="Logo hero" />
                </div>

            </div>

        </section>
    )
}