"use client";
import ProductCard from "@/app/components/ProductCard";
import Product from "@/types/Product";
import NovedadesCaroussel from "@/app/components/NovedadesCaroussel";
import Navbar from '@/app/components/Navbar'
import { useProductos } from "@/hooks/useProductos";
import { CircularProgress } from "@nextui-org/react";
import EmptyProductsSVG from "./components/EmptyProductsSVG";
import { useNovedades } from "@/hooks/useNovedades";

export default function Home() {
  const { productos, loading, error } = useProductos();
  const { novedades, loading: loadingNovedades, error: errorNovedades } = useNovedades();

  if (loading || loadingNovedades) return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <CircularProgress color="warning" size="lg" aria-label="Loading..." />
    </div>
  );

  return (
    <main className="flex min-h-screen min-w-screen flex-col items-center bg-primary">
      <Navbar />
      <section className="flex w-full h-fit p-1 bg-accent mt-16 items-center justify-between">
        <p className="text-primary text-xs ml-5 uppercase">
          ✈️ Envíos nacionales y locales
        </p>
        <a href="https://www.instagram.com/matsanmx/">
          <img src="/instagram.svg" alt="Argentina" className="text-primary fill-primary w-5 h-5 mr-5" />
        </a>
      </section>
      <section className="flex w-full h-full flex-col p-2 bg-primary mt-2 lg:mt-4">
        <section className="flex flex-col w-full h-full lg:pr-20 lg:pl-20 lg:pb-0">
          <h1 className="text-2xl text-center font-light p-1 text-accent tracking-wide mb-5">NUEVA COLECCI&Oacute;N</h1>
          <NovedadesCaroussel productsTendencia={novedades} />
        </section>
        <section className="flex flex-col w-full h-full mt-5 lg:p-20 lg:pt-0">
          <div className="gap-2 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 lg:gap-6 w-full">
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
      <footer>
        <div className="flex w-full h-20 items-center justify-center">
          <a href="https://www.instagram.com/araf.innovations/" className="text-secondary">Created by Araf Innovations 2024</a>
        </div>
      </footer>
    </main>
  )
}
