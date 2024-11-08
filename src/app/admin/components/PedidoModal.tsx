import React, { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Divider } from "@nextui-org/react";
import { Pedido } from "@/types/Pedido";
import { markPedidoAsCompleted } from "@/server/actions";

interface PedidoModalProps {
    isOpen: boolean;
    onClose: () => void;
    pedido?: Pedido;
}

export default function EditModal({ isOpen, onClose, pedido }: PedidoModalProps) {
    const [loading, setLoading] = useState(false);

    // Calcula subtotal, descuento total y total acumulado
    const subtotal = pedido?.carrito?.items.reduce((acc, producto) => {
        return acc + producto.product.price * producto.quantity;
    }, 0);

    const totalDiscount = pedido?.carrito?.items.reduce((acc, producto) => {
        return acc + (producto.product.discount ?? 0) * producto.quantity;
    }, 0);

    const total = (subtotal ?? 0) - (totalDiscount ?? 0);

    // Función para finalizar el pedido
    const completarPedido = async () => {
        setLoading(true);
        try {
            // Aquí se puede agregar la lógica para finalizar el pedido
            await markPedidoAsCompleted(pedido?.id!);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
            onClose();
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            placement="bottom-center"
            onOpenChange={(open) => {
                if (!open) onClose();
            }}
            hideCloseButton
            scrollBehavior="inside"
            isDismissable={false}
        >
            <ModalContent>
                <>
                    <ModalHeader className="flex flex-col gap-1">
                        <h2 className="text-accent">Detalle del Pedido</h2>
                        <p className=" text-sm text-secondary">{pedido?.id.toUpperCase()}</p>
                    </ModalHeader>
                    <ModalBody>
                        {pedido?.carrito?.items.map((producto) => (
                            <div key={producto.product.productId} className="flex gap-3 items-center">
                                <img
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

                        <Divider />

                        <div className="flex flex-col gap-2">
                            <p className="text-md text-accent">Subtotal: ${subtotal?.toFixed(2)}</p>
                            <p className="text-md text-accent">Descuento Total: -${totalDiscount?.toFixed(2)}</p>
                            <p className="text-md text-accent font-bold">Total: ${total?.toFixed(2)}</p>
                        </div>

                        <Divider />
                        <div className="text-accent">
                            {/* <p>{pedido?.primerNombre} {pedido?.segundoNombre} {pedido?.primerApellido} {pedido?.segundoApellido}</p>
                            <p>{pedido?.telefono}</p>
                            <p>{pedido?.calle} {pedido?.numero} {pedido?.colonia}</p>
                            <p>{pedido?.ciudad}, {pedido?.estado}</p>
                            <p>{pedido?.cp}</p> */}
                            <p>
                                {pedido?.envio ? pedido?.envio === "tienda" ? "Recoger en Tienda" : "Entrega en Universidad" : "Sin especificar"}
                            </p>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" variant="flat" onPress={onClose} disabled={loading}>
                            Cerrar
                        </Button>
                        <Button color="secondary" onPress={completarPedido} isLoading={loading}>
                            Finalizar
                        </Button>
                    </ModalFooter>
                </>
            </ModalContent>
        </Modal>
    );
}
