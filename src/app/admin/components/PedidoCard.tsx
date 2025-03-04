"use client";
import { Pedido } from "@/types/Pedido";
import { Card, CardHeader, CardBody, CardFooter, Divider, Image } from "@nextui-org/react";
import PedidoModal from "./PedidoModal";
import { useState } from "react";

export default function PedidoCard(pedido?: Pedido) {
    const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

    // Calcula subtotal, descuento total y total acumulado
    const subtotal = pedido?.carrito?.items.reduce((acc, producto) => {
        return acc + producto.product.price * producto.quantity;
    }, 0);

    const totalDiscount = pedido?.carrito?.items.reduce((acc, producto) => {
        return acc + (producto.product.discount ?? 0) * producto.quantity;
    }, 0);

    const total = (subtotal ?? 0) - (totalDiscount ?? 0);

    return (
        <>
            <Card className="max-w-[400px]" isPressable onPress={() => setIsConfirmationOpen(true)}>
                <CardHeader className="flex gap-3 w-full justify-start text-left">
                    <div className="flex flex-col">
                        <p className="text-md text-accent">{pedido?.primerNombre} {pedido?.segundoNombre} {pedido?.primerApellido}</p>
                        <p className="text-small text-default-500">{pedido?.id}</p>
                    </div>
                </CardHeader>
                <Divider />
                <CardBody>
                    <div className="flex flex-col space-y-2">
                        {pedido?.carrito?.items.map((producto) => (
                            <div key={producto.product.productId} className="flex gap-3 items-center">
                                <Image
                                    width="50px"
                                    height="50px"
                                    src={producto.product.img}
                                    alt={producto.product.name}
                                />
                                <div>
                                    <p className="text-md text-accent">{producto.product.name}</p>
                                    <p className="text-small text-default-500">Cantidad: {producto.quantity}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardBody>
                <Divider />
                <CardFooter>
                    <p className="text-md text-accent font-bold">Total: ${total?.toFixed(2)}</p>
                </CardFooter>
            </Card>
            <PedidoModal
                isOpen={isConfirmationOpen}
                onClose={() => setIsConfirmationOpen(false)}
                pedido={pedido}
            />
        </>
    );
}
