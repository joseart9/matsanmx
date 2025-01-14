"use client";

import React, { useEffect } from "react";
import { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Divider } from "@nextui-org/react";
import { Navbar, NavbarBrand, NavbarContent } from "@nextui-org/react";
import { CartItem } from "@/types/Cart";
import { useCart } from "@/providers/CartContext";
import CartSVG from "@/app/components/CartSVG";
import CheckOutModal from "./CheckoutModal";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { HiOutlineTrash } from "react-icons/hi";

import CheckoutModal from "@/app/components/MobileView/CheckoutModal";

export default function NavBarComponent() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { cart } = useCart();
    // Estado para controlar el modal de checkout
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

    // Funciones para abrir y cerrar el modal de checkout
    const openCheckoutModal = () => setIsCheckoutOpen(true);
    const closeCheckoutModal = () => setIsCheckoutOpen(false);

    const [isClient, setIsClient] = useState(false);

    const [modalIsOpen, setIsOpen] = useState(false);

    // Asegurar que estamos en el cliente
    useEffect(() => {
        setIsClient(true);
    }, []);

    return (
        <div className="flex h-fit flex-col gap-2 w-full fixed z-50">
            <NavbarComponent onOpenCart={onOpen} isClient={isClient} />

            <CheckoutModal modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} cart={cart} />

            {/* Modal for Cart */}
            <Modal
                isOpen={isOpen}
                placement="bottom-center"
                onOpenChange={onOpenChange}
                scrollBehavior="inside"
                hideCloseButton
                className="bg-[#FFF9F0]"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1"></ModalHeader>
                            <ModalBody>
                                <div className="flex flex-col gap-2">
                                    {cart.length === 0 && (
                                        <div className="text-secondary flex flex-row text-center w-full items-center justify-center">
                                            <CartSVG />
                                        </div>
                                    )}

                                    {cart.map((item: any, index: number) => (
                                        <CheckOutInfo key={index} {...item} />
                                    ))}
                                </div>

                                <Divider className="my-2 bg-secondary" />

                                {cart.length > 0 && (
                                    <div className="flex flex-col text-right space-y-2">
                                        <p className="text-lg text-secondary">
                                            Subtotal: ${cart.reduce((acc: number, item: any) => acc + item.product.price * item.quantity, 0).toFixed(2)}
                                        </p>
                                        <p className="text-lg text-secondary">
                                            Descuento: ${cart.reduce((acc: number, item: any) => acc + item.product.discount * item.quantity, 0).toFixed(2)}
                                        </p>
                                        <p className="font-black text-lg text-accent">
                                            Total: ${cart.reduce((acc: number, item: any) => acc + (item.product.price - (item.product.discount || 0)) * item.quantity, 0).toFixed(2)}
                                        </p>
                                    </div>
                                )}

                            </ModalBody>
                            <ModalFooter>
                                <Button className="font-semibold text-accent/80" radius="full" color="secondary" isDisabled={cart.length === 0} onPress={() => {
                                    onClose();
                                    setIsOpen(true);
                                }}>
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
        <div className="grid grid-cols-12 items-center justify-between">
            <p className="text-lg text-accent font-black col-span-6">{cartItem.product.name}</p>
            <div className="flex flex-row items-center space-x-3 col-span-6 justify-end">
                <p className="text-lg text-ellipsis text-accent font-black">${cartItem.product.price}&nbsp;x {cartItem.quantity}</p>
                <Button onPress={handleRemove} isIconOnly className="bg-transparent rounded-full text-red-500/70">
                    <HiOutlineTrash className="size-5 mb-1" />
                </Button>
            </div>
        </div>
    );
}

function NavbarComponent({ onOpenCart, isClient }: { onOpenCart: () => void; isClient: boolean }) {
    const { cart } = useCart();

    // Calcular la cantidad total de items en el carrito
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <Navbar className="bg-secondary" position="sticky">
            <NavbarBrand>
                <img src="/logo.svg" alt="logo" className="size-20 pt-2" />
            </NavbarBrand>

            <NavbarContent as="div" justify="end">
                {/* Cart Button */}
                {isClient && (
                    <Button isIconOnly className="bg-transparent text-accent relative rounded-none" onClick={onOpenCart}>
                        <HiOutlineShoppingBag className="size-7" />
                        {
                            totalItems ? (
                                <div className="absolute top-0 right-0 bg-primary/70 font-black text-accent rounded-full w-4 h-4 flex items-center justify-center text-md" >
                                    {totalItems}
                                </div>
                            ) : (
                                ""
                            )}
                    </Button>
                )}
            </NavbarContent>
        </Navbar >
    );
}
