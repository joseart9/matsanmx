"use client";
import ProductCard from "./ProductCard";
import Product from "@/types/Product";
import NovedadesCaroussel from "@/app/components/NovedadesCaroussel";
import Navbar from '@/app/components/Navbar'
import { useProductos } from "@/hooks/useProductos";
import EmptyProductsSVG from "@/app/components/EmptyProductsSVG";
import { useNovedades } from "@/hooks/useNovedades";
import { Spinner } from "@nextui-org/react";

export default function Home() {
    const { productos, loading, error } = useProductos();
    const { novedades, loading: loadingNovedades, error: errorNovedades } = useNovedades();

    if (loading || loadingNovedades) return (
        <>
            <Navbar />
            <div className="flex min-h-screen w-full items-center justify-center bg-[#FFF6E9]">
                <Spinner color="warning" size="lg" aria-label="Loading..." />
            </div>
        </>
    );

    return (
        <main className="flex min-h-screen min-w-screen flex-col items-center bg-[#FFF6E9]">
            <Navbar />


            <section className="flex h-fit w-full p-1 bg-accent mt-16 items-center justify-center">
                <div className="px-3 container mx-auto flex flex-row w-full max-w-5xl items-center justify-between">
                    <p className="text-primary text-md ml-5 uppercase">
                        ✈️ Envíos nacionales y locales
                    </p>
                    <a href="https://www.instagram.com/matsanmx/">
                        <img src="/instagram.svg" alt="Argentina" className="text-primary fill-primary w-5 h-5 mr-5" />
                    </a>
                </div>

            </section>


            <section className="container mx-auto flex w-full h-full flex-col bg-[#FFF6E9] max-w-7xl">
                <h1 className="text-2xl text-center font-black text-accent tracking-wide my-5">NUEVA COLECCIÓN</h1>
                <section
                    style={{
                        height: "calc(100vh - 170px)",
                    }}
                    className="flex flex-col h-screen w-full"
                >
                    <NovedadesCaroussel productsTendencia={novedades} />
                </section>

                <section className="flex flex-col w-full h-full mt-8">
                    <div className="justify-items-center grid gap-y-10 w-full md:grid-cols-[repeat(auto-fill,minmax(250px,1fr))]">
                        {productos.map((product, index) => (
                            <ProductCard key={index} product={product as Product} />
                        ))}
                    </div>
                    {productos.length === 0 && (
                        <div className="flex w-full h-full items-center justify-center text-accent">
                            <EmptyProductsSVG />
                        </div>

                    )}
                </section>
            </section>

            <footer className="bg-secondary w-full mt-10 flex h-24 justify-start px-6 py-4">
                <div className="flex flex-row gap-4 items-center">
                    <img
                        src="/logo.svg"
                        alt="MatsanMX"
                        className="w-20 h-20"
                    />
                    <div className="flex flex-col gap-2 text-start">
                        <h3 className="text-accent text-md font-semibold">
                            MatsanMX
                        </h3>
                        <a href="https://www.instagram.com/araf.innovations/" className="text-accent/70 font-semibold text-md">
                            Powered by Araf Innovations 2024
                        </a>
                    </div>
                </div>
            </footer>
        </main>
    )
}
