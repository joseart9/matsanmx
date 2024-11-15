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
            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarBrand className="space-x-5 items-center">
                    <p className="text-xl uppercase">
                    </p>
                    <img src="/logo.svg" alt="Logo" className="h-16 w-auto" />
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                {menuItems.map((item, index) => (
                    <NavbarItem key={`${item}-${index}`}>
                        <Button
                            size="lg"
                            variant="light"
                            color="warning"
                            radius="full"
                            className="uppercase"
                        >
                            <Link href={item.href}>
                                {item.label}
                            </Link>
                        </Button>
                    </NavbarItem>
                ))}
            </NavbarContent>




            <NavbarContent className="sm:hidden pr-3" justify="center">
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="sm:hidden"
                    icon={isMenuOpen ? <CloseSVG /> : <HamburgerSVG />}
                >
                </NavbarMenuToggle>

                <NavbarBrand>
                    <img src="/logo.svg" alt="logo" className="w-auto h-16" />

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
