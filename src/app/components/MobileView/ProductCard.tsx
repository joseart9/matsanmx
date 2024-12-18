"use client";
import { useEffect, useState } from "react";
import { Card, CardBody, CardFooter } from "@nextui-org/react";
import Image from 'next/image'
import dynamic from 'next/dynamic';
import Product from "@/types/Product";
import { useCart } from "@/providers/CartContext";

import Alert from "@/utils/Alert";

import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

const DynamicButton = dynamic(() => import('@nextui-org/button').then(mod => mod.Button), { ssr: false });

export default function ProductCard({ product }: { product: Product }) {
    const [quantity, setQuantity] = useState(0);
    const { cart, addToCart, updateQuantity, removeFromCart } = useCart();

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
        <Card shadow="none" radius="none" className="w-auto h-[350px] bg-transparent rounded-t-sm">
            <CardBody className="overflow-visible p-0 w-full">
                <Zoom classDialog="custom-zoom">
                    <Image
                        src={product.img ?? ""}
                        alt={product.name}
                        width={250}
                        height={250}
                        className="w-full h-full object-cover aspect-[1/1] object-center cursor-pointer"
                        loading="lazy"
                    />
                </Zoom>
                <div className="grid grid-cols-12 w-full h-fit pt-2 px-1">
                    <div className="col-span-7 h-fit">
                        <p className="text-xs font-bold line-clamp-3 text-accent uppercase">
                            {product.name}
                        </p>
                        <div className="flex items-center space-x-1 pt-1">
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
                                        <FaMinus className="size-5 text-accent" />
                                    </DynamicButton>
                                    <span className="text-md font-black text-accent">{quantity}</span>
                                    <DynamicButton isIconOnly onClick={incrementQuantity} size="sm" className="bg-transparent">
                                        <FaPlus className="size-5 text-accent" />
                                    </DynamicButton>
                                </div>
                            ) : (
                                <div className="flex items-center justify-end">
                                    <DynamicButton onClick={incrementQuantity} isIconOnly size="sm" className="flex bg-transparent">
                                        <FaPlus className="size-5 text-accent" />
                                    </DynamicButton>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="flex col-span-5 justify-end">
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
        </Card>
    );
}
