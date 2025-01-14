"use client";

import React from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from "@nextui-org/react";

export default function App() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    return (
        <Navbar onMenuOpenChange={setIsMenuOpen} className="bg-secondary">
            <NavbarContent>
                <NavbarBrand>
                    <img src="/logo.svg" alt="logo" className="w-auto h-16" />
                </NavbarBrand>

                <NavbarItem>
                    <Button as={Link} color="primary" href="/api/auth/login" variant="solid" className="text-accent">
                        Ingresar
                    </Button>
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    );
}
