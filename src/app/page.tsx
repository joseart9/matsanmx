"use client";

import ProductCard from "@/app/components/ProductCard";
import Product from "@/types/Product";
import NovedadesCaroussel from "@/app/components/NovedadesCaroussel";
import Navbar from '@/app/components/Navbar'
import { useProductos } from "@/hooks/useProductos";
import { CircularProgress } from "@nextui-org/react";
import EmptyProductsSVG from "./components/EmptyProductsSVG";

export default function Home() {
  const { productos, loading, error } = useProductos();

  if (loading) return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <CircularProgress color="warning" size="lg" aria-label="Loading..." />
    </div>
  );

  const productsTendencia = [
    {
      img: "https://fastly.picsum.photos/id/866/200/300.jpg?hmac=rcadCENKh4rD6MAp6V_ma-AyWv641M4iiOpe1RyFHeI",
    },
    {
      img: "https://fastly.picsum.photos/id/866/200/300.jpg?hmac=rcadCENKh4rD6MAp6V_ma-AyWv641M4iiOpe1RyFHeI",
    },
  ]
  return (
    <main className="flex min-h-screen w-screen flex-col items-center">
      <Navbar />
      <section className="flex w-full min-h-screen flex-col p-2 bg-primary">
        <section className="flex flex-col w-full h-full">
          <h1 className="text-2xl text-center font-light p-1 text-accent tracking-wide">Novedades</h1>
          <NovedadesCaroussel productsTendencia={productsTendencia} />
        </section>
        <section className="flex flex-col w-full h-full mt-5">
          <div className="gap-2 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 w-full">
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

    </main>
  )
}
