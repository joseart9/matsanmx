"use client";

import { usePedidos } from "@/hooks/usePedidos";
import { Spinner } from "@nextui-org/react";
import PedidoCard from "@/app/admin/components/PedidoCard";

export default function AdminPedidos() {
    const { pedidos, loading, error } = usePedidos();

    if (loading) return (
        <div className="flex min-h-screen w-full items-center justify-center">
            <Spinner color="warning" size="lg" aria-label="Loading..." />
        </div>
    );

    // Filtra los pedidos para mostrar solo los que no están finalizados
    const pedidosNoFinalizados = pedidos.filter((pedido) => !pedido.finalizado);

    return (
        <section className="flex flex-col min-h-screen w-full bg-primary">
            <h1 className="flex text-2xl mt-1 text-accent items-center justify-center">
                Pedidos
            </h1>
            {pedidosNoFinalizados.length === 0 && (
                <div className="flex w-full h-full text-center items-center justify-center mt-5">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-secondary">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                    </svg>
                </div>
            )}
            <div className="p-2 gap-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 w-full">
                {pedidosNoFinalizados.map((pedido) => (
                    <PedidoCard key={pedido.id} {...pedido} />
                ))}
            </div>
        </section>
    );
}
