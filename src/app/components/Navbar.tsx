"use client";

import React from "react";
import { useEffect, useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Divider } from "@nextui-org/react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link } from "@nextui-org/react";
import { Button as IconButton } from "@nextui-org/button";
import Product from "@/types/Product";
import { CartItem } from "@/types/Cart";
import { useCart } from "@/providers/CartContext";

export default function NavBarComponent() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { cart } = useCart();

    return (
        <div className="flex flex-col gap-2 w-full">
            <NavbarComponent onOpenCart={onOpen} />


            {/* Modal for Cart */}
            <Modal
                isOpen={isOpen}
                placement="bottom-center"
                onOpenChange={onOpenChange}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Carrito</ModalHeader>
                            <ModalBody>

                                <div className="flex flex-col gap-2">
                                    {cart.map((item: any, index: number) => (
                                        <CheckOutInfo key={index} {...item} />
                                    ))}
                                </div>

                                <Divider className="my-2" />

                                <div className="flex flex-col text-right space-y-2">
                                    <p className="text-lg">
                                        Subtotal: ${cart.reduce((acc: number, item: any) => acc + item.product.price * item.quantity, 0).toFixed(2)}
                                    </p>
                                    <p className="text-lg">
                                        Descuento: ${cart.reduce((acc: number, item: any) => acc + item.product.discount * item.quantity, 0).toFixed(2)}
                                    </p>
                                    <p className="font-bold text-lg">
                                        Total: ${cart.reduce((acc: number, item: any) => acc + item.product.price * item.quantity, 0).toFixed(2)}
                                    </p>
                                </div>

                            </ModalBody>
                            <ModalFooter>
                                <Button color="default" variant="flat" onPress={onClose}>
                                    Cerrar
                                </Button>
                                <Button color="primary" onPress={onClose}>
                                    Checkout
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div >
    );
}

function CheckOutInfo(cartItem: CartItem) {
    const { removeFromCart } = useCart();

    const handleRemove = () => {
        removeFromCart(cartItem.product.productId);
    };
    return (
        <div className="flex gap-2 items-center justify-between">

            <p className="text-lg text-default-500">{cartItem.product.name}</p>
            <div className="flex fles-row items-center space-x-3">
                <p className="text-lg text-ellipsis">${cartItem.product.price}&nbsp;x {cartItem.quantity}</p>
                <Button onPress={handleRemove} isIconOnly className="bg-transparent rounded-full text-red-700">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                </Button>
            </div>
        </div>
    );
}

function NavbarComponent({ onOpenCart }: { onOpenCart: () => void }) {
    return (
        <Navbar className="bg-slate-50">
            <NavbarBrand>
                <p className="font-bold text-inherit">LOGO</p>
            </NavbarBrand>

            <NavbarContent as="div" justify="end">
                {/* Cart Button */}
                <IconButton isIconOnly className="bg-transparent" onClick={onOpenCart}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                    </svg>
                </IconButton>
            </NavbarContent>
        </Navbar>
    );
}
