"use client";
import { useEffect, useState } from "react";
import { Button, Card, CardBody, CardFooter, Modal, ModalContent, useDisclosure } from "@nextui-org/react";
import Image from 'next/image'
import dynamic from 'next/dynamic';
import Product from "@/types/Product";
import { useCart } from "@/providers/CartContext";

import Alert from "@/utils/Alert";

import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";

import { IoMdClose } from "react-icons/io";

const DynamicButton = dynamic(() => import('@nextui-org/button').then(mod => mod.Button), { ssr: false });

export default function ProductCard({ product }: { product: Product }) {
    const [quantity, setQuantity] = useState(0);
    const { cart, addToCart, updateQuantity, removeFromCart } = useCart();
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    // Load product quantity from localStorage on mount
    useEffect(() => {
        const existingProduct = cart.find((item) => item.product.productId === product.productId);
        setQuantity(existingProduct ? existingProduct.quantity : 0);
    }, [cart, product.productId]);

    const incrementQuantity = () => {
        if (quantity < (product.stock ?? 0)) { // Verifica si hay stock disponible
            const newQuantity = quantity + 1;
            setQuantity(newQuantity);
            const cartItem = { product, quantity: 1 };
            addToCart(cartItem);
        } else {
            Alert("Lo sentimos, por el momento no hay mas stock de este producto.", "error", "top-center", "quantityWarning");
        }
    };

    const decrementQuantity = () => {
        const newQuantity = Math.max(0, quantity - 1);
        setQuantity(newQuantity);
        if (newQuantity > 0) {
            updateQuantity(product.productId, newQuantity);
        } else {
            // Remover del carrito si la cantidad es 0
            removeFromCart(product.productId);
        }
    };

    const discountedPrice = product.hasDiscount
        ? (product.price - (product.discount ?? 0)).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })
        : product.price.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 });

    return (
        <Card shadow="none" radius="none" className="w-auto h-[350px] bg-transparent">
            <CardBody className="overflow-visible p-0 w-full">
                <div className="w-auto h-[200px]">
                    <Image
                        src={product.img ?? ""}
                        alt={product.name}
                        width={250}
                        height={250}
                        className="w-full h-full object-cover aspect-[1/1] object-center cursor-pointer"
                        onClick={onOpen}
                        loading="lazy"
                    />
                </div>
                <div className="grid grid-cols-12 w-full h-fit p-2">
                    <div className="col-span-7 h-fit">
                        <p className="text-xs font-bold line-clamp-3 text-accent uppercase">
                            {product.name}
                        </p>
                        <div className="flex items-center space-x-1">
                            {product.hasDiscount && (
                                <p className="text-red line-through text-sm">
                                    ${product.price}
                                </p>
                            )}
                            <p className="text-default-800 text-md">
                                ${discountedPrice}
                            </p>
                        </div>
                    </div>
                    {product.stock && product.stock > 0 ? (
                        <div className="col-span-5 w-full h-fit items-center justify-end">
                            {quantity > 0 ? (
                                <div className="flex items-center justify-end">
                                    <DynamicButton isIconOnly onClick={decrementQuantity} size="sm" className="bg-transparent">
                                        <FaMinus className="size-4" />
                                    </DynamicButton>
                                    <span className="text-md font-black">{quantity}</span>
                                    <DynamicButton isIconOnly onClick={incrementQuantity} size="sm" className="bg-transparent">
                                        <FaPlus className="size-4" />
                                    </DynamicButton>
                                </div>
                            ) : (
                                <div className="flex items-center justify-end">
                                    <DynamicButton onClick={incrementQuantity} isIconOnly size="sm" className="flex bg-transparent">
                                        <FaPlus className="size-4" />
                                    </DynamicButton>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="flex mt-2 col-span-5 justify-end">
                            <span className="text-xs text-red-500 font-semibold">AGOTADO</span>
                        </div>
                    )}
                </div>
            </CardBody>
            <CardFooter className="flex items-start">
                <b className="text-xs line-clamp-4 text-secondary uppercase">
                    {product.description}
                </b>
            </CardFooter>

            <Modal size="full" className="h-screen" isOpen={isOpen} onOpenChange={onOpenChange} hideCloseButton>
                <ModalContent className="flex items-center justify-center h-screen min-h-screen absolute gap-2 bg-black/60">
                    <div className="flex flex-row items-center">
                        <h3 className="text-white font-semibold capitalize">
                            {product.name}
                        </h3>
                        <Button isIconOnly variant="light" color="primary" className="text-white relative fixed top-5 right-5" onClick={onOpenChange}>
                            <IoMdClose className="size-7" />
                        </Button>
                    </div>

                    <div className="w-3/4 h-3/4 flex items-center justify-center">
                        <img src={product.img} alt={product.name} onClick={onOpenChange} className="max-w-full max-h-full object-contain" />
                    </div>
                </ModalContent>
            </Modal>
        </Card>
    );
}
