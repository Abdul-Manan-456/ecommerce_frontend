import { Button } from "@/components/ui/button"
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import ShoppingCart from "../../../../public/icons/Cart";
import Person from "../../../../public/icons/Person";
import Search from "./search";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { fetchCategoryApi } from "@/lib/redux/slices/category/categoryApi";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { MenuIcon } from "../../../../public/icons"
import { Separator } from "@/components/ui/separator";
const Menu = () => {
    const { category } = useAppSelector((state) => state.category);
    const navItems = category && category.map((item) => ({
        path: `/collections/${item.category}`,
        name: `${item.category}`
    }))
    navItems.unshift({ path: '/', name: 'home' })
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchCategoryApi());
    }, [dispatch])
    let pathname = usePathname() || "/";
    const deCodedPath = decodeURIComponent(pathname)

    if (pathname.includes("/writing/")) {
        pathname = "/writing";
    }

    return (
        <div className="z-50 ">
            <Drawer>

                <DrawerTrigger><MenuIcon /></DrawerTrigger>
                <DrawerContent className="z-40 border-none">

                    <DrawerHeader>
                        <DrawerTitle>
                            Menu
                        </DrawerTitle>
                        <Separator className="mt-2" />
                    </DrawerHeader>
                    {navItems.map((item, index) => {
                        const isActive = item.path === deCodedPath;
                        return (
                            <Link
                                key={index}
                                className={`px-4 py-2 rounded-none text-sm lg:text-base relative no-underline duration-300 ease-in ${isActive ? "text-zinc-100" : "text-zinc-400"
                                    }`}
                                data-active={isActive}
                                href={item.path}
                            >
                                <DrawerClose>
                                    <span className="capitalize">{item.name}</span>
                                    {item.path === deCodedPath && (
                                        <motion.div
                                            className="absolute left-0 top-0  h-full bg-stone-800/80 rounded-none -z-10"

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
                                </DrawerClose>

                            </Link>
                        );
                    })}

                    <DrawerFooter>
                        <DrawerClose>
                            <Button variant="outline">Cancel</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>

        </div>
    )
}

export default Menu
