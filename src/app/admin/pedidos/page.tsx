"use client";

import { usePedidos } from "@/hooks/usePedidos";
import { CircularProgress } from "@nextui-org/react";
import PedidoCard from "@/app/admin/components/PedidoCard";

export default function AdminPedidos() {
    const { pedidos, loading, error } = usePedidos();

    if (loading) return (
        <div className="flex min-h-screen w-full items-center justify-center">
            <CircularProgress color="warning" size="lg" aria-label="Loading..." />
        </div>
    );

    return (
        <section className="flex flex-col min-h-screen w-screen bg-primary">
            <div className="p-2 gap-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 w-full">
                {pedidos.map((pedido) => (
                    <PedidoCard key={pedido.id} {...pedido} />
                ))}
            </div>
        </section>
    )
}