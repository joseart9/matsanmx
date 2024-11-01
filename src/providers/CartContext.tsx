import React, { createContext, useContext, useEffect, useState } from "react";
import { CartItem } from "@/types/Cart";

interface CartContextType {
    cart: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cart, setCart] = useState<CartItem[]>(() => {
        if (typeof window !== "undefined") {
            return JSON.parse(localStorage.getItem("cart") || "[]");
        }
        return [];
    });

    useEffect(() => {
        if (typeof window !== "undefined") {
            localStorage.setItem("cart", JSON.stringify(cart));
        }
    }, [cart]);

    const addToCart = (item: CartItem) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find(i => i.product.productId === item.product.productId);
            if (existingItem) {
                return prevCart.map(i =>
                    i.product.productId === item.product.productId
                        ? { ...i, quantity: i.quantity + item.quantity }
                        : i
                );
            }
            return [...prevCart, item];
        });
    };

    const removeFromCart = (productId: string) => {
        setCart((prevCart) => prevCart.filter(i => i.product.productId !== productId));
    };

    const updateQuantity = (productId: string, quantity: number) => {
        setCart((prevCart) =>
            prevCart.map(i =>
                i.product.productId === productId ? { ...i, quantity } : i
            )
        );
    };

    // Nueva función clearCart para vaciar el carrito
    const clearCart = () => {
        setCart([]);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};
