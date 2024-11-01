"use client";

import { useProductos } from "@/hooks/useProductos";

export default function AdminPedidos() {
    const { productos, loading, error } = useProductos();

    console.log(productos);

    return (
        <div>
            <h1>Admin Pedidos</h1>
        </div>
    )
}