"use client";

import { useProductos } from "@/hooks/useProductos";
import ProductCard from "@/app/admin/components/ProductCard";
import { CircularProgress } from "@nextui-org/react";

export default function AdminPedidos() {
    const { productos, loading, error } = useProductos();

    if (loading) return (
        <div className="flex min-h-screen w-full items-center justify-center">
            <CircularProgress color="warning" size="lg" aria-label="Loading..." />
        </div>
    );

    console.log(productos);

    return (
        <div className="flex flex-col min-h-screen w-screen mt-5">
            {productos.map((producto) => (
                <ProductCard key={producto.productId} product={producto} />
            ))}
        </div>
    )
}