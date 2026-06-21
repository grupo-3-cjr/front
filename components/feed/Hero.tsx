export default function Hero() {
    return(
        <section className="bg-black text-white h-[300px] sm:h-[380px] overflow-hidden">

            <div className="h-full max-w-[1218px] mx-auto flex items-center justify-center sm:justify-between px-4 xm:px-8 lg:px-16">

                <div className="sm:w-[50%] w-full z-10">
                    <h1 className="text-4xl sm:text-5xl font-bold leading-[1.05] sm:text-right text-center tracking-tight">
                        Do CAOS à organização, <br />
                        em alguns cliques
                    </h1>
                </div>

                <div className="hidden sm:flex w-[42%] justify-start items-end h-full">
                    <img className="w-[300px] lg:w-[430px] translate-y-40 lg:translate-y-60 -translate-x-30 lg:-translate-x-30" src="/hero.png" alt="Logo hero" />
                </div>

            </div>

        </section>
    )
}