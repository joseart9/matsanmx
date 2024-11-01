"use client";
import { useEffect, useState } from "react";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import dynamic from 'next/dynamic';
import Product from "@/types/Product";
import { useCart } from "@/providers/CartContext";

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
        const newQuantity = quantity + 1;
        setQuantity(newQuantity);
        const cartItem = { product, quantity: 1 };
        addToCart(cartItem);
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
        <Card shadow="sm" radius="sm">
            <CardBody className="overflow-visible p-0 w-full">
                <Image
                    shadow="md"
                    radius="none"
                    width="100%"
                    alt={product.name}
                    className="w-full h-[140px]"
                    src={product.img}
                />
                <div className="grid grid-cols-2 w-full h-full p-2">
                    <div>
                        <p className="text-sm font-bold line-clamp-3 text-accent">
                            {product.name}
                        </p>
                        <div className="flex items-center space-x-1">
                            {product.hasDiscount && (
                                <p className="text-red line-through text-md">
                                    ${product.price.toFixed(0)}
                                </p>
                            )}
                            <p className="text-default-800">
                                ${discountedPrice}
                            </p>
                        </div>
                    </div>
                    {quantity > 0 ? (
                        <div className="flex items-center justify-end">
                            <DynamicButton isIconOnly onClick={decrementQuantity} size="sm" className="bg-transparent">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                                </svg>
                            </DynamicButton>
                            <span className="text-lg">{quantity}</span>
                            <DynamicButton isIconOnly onClick={incrementQuantity} size="sm" className="bg-transparent">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                </svg>
                            </DynamicButton>
                        </div>
                    ) : (
                        <div className="flex h-full w-full items-center justify-end">
                            <DynamicButton onClick={incrementQuantity} isIconOnly size="sm" className="flex bg-transparent">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                </svg>
                            </DynamicButton>
                        </div>
                    )}
                </div>
            </CardBody>
            <CardFooter className="text-small">
                <b className="text-default-400 text-md line-clamp-4 text-secondary">{product.description}</b>
            </CardFooter>
        </Card>
    );
}
