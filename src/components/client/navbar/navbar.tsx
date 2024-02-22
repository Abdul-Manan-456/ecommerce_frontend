"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import ShoppingCart from "../../../../public/icons/Cart";
import Person from "../../../../public/icons/Person";
import Search from "./search";
import { useAppSelector } from "@/lib/redux/hooks";


const navItems = [
    {
        path: "/",
        name: "Home",
    },
    {
        path: "/collections/men's clothing",
        name: "Men",
    },
    {
        path: "/collections/women's clothing",
        name: "Women",
    },
    {
        path: "/collections/jewelery",
        name: "Jewelery",
    },
    {
        path: "/collections/electronics",
        name: "Electronics",
    },
];

export default function NavBar() {
    const { totalQuantity } = useAppSelector((state) => state.cart)
    let pathname = usePathname() || "/";
    const deCodedPath = decodeURIComponent(pathname)

    if (pathname.includes("/writing/")) {
        pathname = "/writing";
    }
    const [clicked, setClicked] = useState(deCodedPath);
    return (
        <div className="sticky top-0 bottom_shadow p-1 h-12 flex items-center  z-50 bg-white backdrop-blur-md">
            <nav className="flex items-center  justify-between w-full z-50  rounded-lg">
                <div className="relative">
                    {navItems.map((item, index) => {
                        const isActive = item.path === deCodedPath;
                        return (
                            <Link
                                key={index}
                                className={`px-4 py-2 rounded-none text-sm lg:text-base relative no-underline duration-300 ease-in ${isActive ? "text-zinc-100" : "text-zinc-400"
                                    }`}
                                data-active={isActive}
                                href={item.path}
                                onClick={() => setClicked(item.path)}
                            >
                                <span>{item.name}</span>
                                {item.path === deCodedPath && (
                                    <motion.div
                                        className="absolute left-0 top-0  h-full bg-stone-800/80 rounded-none -z-10"
                                        // layoutId="absolute"
                                        aria-hidden="true"
                                        style={{
                                            width: "100%",
                                        }}
                                        transition={{
                                            type: "spring",
                                            duration: 0.3,
                                        }}
                                    />
                                )}
                            </Link>
                        );
                    })}
                </div>
                <div className="flex items-center justify-between w-24 text-black px-2 font-thin text-2xl">

                    <Search />
                    <Link href="/cart" className=" relative">
                        {totalQuantity === 0 ? <div></div> : <div className="absolute -top-2 -right-1 w-4 h-4  bg-black rounded-full text-white text-[10px] flex items-center justify-center">{totalQuantity}</div>}

                        <ShoppingCart className="cursor-pointer" />

                    </Link>
                    <Link href="/auth">
                        <Person className="cursor-pointer" />
                    </Link>
                </div>
            </nav>
        </div>
    );
}