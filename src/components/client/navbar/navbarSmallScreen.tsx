"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import ShoppingCart from "../../../../public/icons/Cart";
import Person from "../../../../public/icons/Person";
import Search from "./search";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { fetchCategoryApi } from "@/lib/redux/slices/category/categoryApi";
import { HomeIcon, MenuIcon } from "../../../../public/icons";
import Menu from "./menu";

export default function NavbarSmallScreen() {

    const { totalQuantity } = useAppSelector((state) => state.cart)

    // ------------- Getting the NavItems --------------------
    const { category } = useAppSelector((state) => state.category);
    const navItems = category && category.map((item) => ({
        path: `/collections/${item.category}`,
        name: `${item.category}`
    }))
    // --------- Putting at first ------------
    navItems.unshift({ path: '/', name: 'home' })
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchCategoryApi());
    }, [dispatch])
    let pathname = usePathname() || "/";
    // const deCodedPath = decodeURIComponent(pathname)


    // ------------- NAVIGATION ITEMS FOR SMALL SCREEN ----------------------
    const navigationItems = [
        { icon: <Menu />, text: 'Menu', link: '#' },
        { icon: <Search />, text: 'Search', link: '#' },
        { icon: <HomeIcon />, text: 'Home', link: '/' },
        { icon: <ShoppingCart />, text: 'Cart', link: '/cart' },
        { icon: <Person />, text: 'Profile', link: '/auth' },
    ];
    return (
        <nav className="md:hidden h-16 z-50 bg-white backdrop-blur-md w-full fixed bottom-0">
            <div className="flex items-center justify-between w-full text-black px-4 h-full font-thin text-2xl">
                {navigationItems.map((item, index) => (
                    <Link href={item.link} key={index}>
                        <div className="relative cursor-pointer">
                            {totalQuantity > 0 && item.text === 'Cart' && (
                                <div className="absolute -top-2 -right-1 w-4 h-4 bg-black rounded-full text-white text-[10px] flex items-center justify-center">
                                    {totalQuantity}
                                </div>
                            )}
                            {item.icon}
                            <p className="text-xs">{item.text}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </nav>
    );
}