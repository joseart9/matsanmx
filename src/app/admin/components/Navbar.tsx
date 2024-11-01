"use client";

import React from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Link, Button } from "@nextui-org/react";
import HamburgerSVG from "./HamburgerSVG";
import CloseSVG from "./CloseSVG";

export default function App() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const menuItems = [
        {
            label: "Productos",
            href: "/admin/productos",
        },
        {
            label: "Agregar Producto",
            href: "/admin/productos/nuevo",
        },
        {
            label: "Pedidos",
            href: "/admin/pedidos",
        },
        {
            label: "Novedades",
            href: "/admin/novedades",
        },
    ];

    return (
        <Navbar onMenuOpenChange={setIsMenuOpen} className="bg-secondary">
            <NavbarContent>
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="sm:hidden"
                    icon={isMenuOpen ? <CloseSVG /> : <HamburgerSVG />}
                >
                </NavbarMenuToggle>

                <NavbarBrand>
                    <p className="text-inherit">Admin</p>
                </NavbarBrand>
            </NavbarContent>

            <NavbarMenu>
                {menuItems.map((item, index) => (
                    <NavbarMenuItem key={`${item}-${index}`}>
                        <Link
                            color="warning"
                            className="w-full"
                            href={item.href}
                            size="lg"
                        >
                            {item.label}
                        </Link>
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </Navbar>
    );
}
