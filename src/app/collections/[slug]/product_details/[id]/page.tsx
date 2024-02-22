"use client";

import AccordionProduct from "@/components/client/product/accordionProduct";
import ProductDetailsCarousel from "@/components/client/product/productDetailsCarousel";
import { Button } from "@/components/ui/button";
import QuantitySelector from "@/components/ui/quantitySelector";
import Heading from "@/components/ui/typography/heading";
import Text from "@/components/ui/typography/text";
import { Suspense, useState } from "react";
import Loading from "./loading";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import Link from "next/link";
import { ADD_TO_CART } from "@/lib/redux/slices/cart/cartSlice";





const Page = () => {
    const [value, setValue] = useState(1);
    const handleIncrement = () => {
        setValue(value + 1);
    }
    const handleDecrement = () => {
        if (value > 1) setValue(value - 1);
    }
    const { selectedProduct } = useAppSelector(((state) => state.products))
    const dispatch = useAppDispatch()

    return (
        <section >
            {/* <div>Home/men/shoes/Product_details</div> */}
            <Suspense fallback={<Loading />}>
                <div className="grid grid-cols-2 gap-8 p-4">
                    <ProductDetailsCarousel />
                    <div>
                        <Heading as="h4" className="mb-2">{selectedProduct?.title}</Heading>
                        <Heading as="h4" className="mb-6">Rs. {selectedProduct?.price}</Heading>
                        <Heading as="h6" className="mb-2">Quantity</Heading>
                        <div className="font-medium grid grid-cols-4 h-8 place-items-center select-none rounded-full w-28 border">
                            <p onClick={handleDecrement} className="border-r cursor-pointer px-3 select-none">-</p>
                            <p className=" col-span-2">{value}</p>
                            <p onClick={handleIncrement} className="border-l px-3 cursor-pointer select-none">+</p>
                        </div>
                        {/* <Text as="muted" className="my-2">Size</Text>
                        <div className="flex items-center ">
                            <div className="w-8 h-8 mr-2 border flex items-center justify-center cursor-pointer rounded-md">S</div>
                            <div className="w-8 h-8  mr-2 border flex items-center justify-center cursor-pointer rounded-md">M</div>
                            <div className="w-8 h-8  mr-2 border flex items-center justify-center cursor-pointer  rounded-md">L</div>
                        </div> */}
                        {/* <div className="flex items-center justify-center"> */}
                        <Link onClick={() => dispatch(ADD_TO_CART({ ...selectedProduct, quantity: value }))} href="/cart">
                            <Button variant={"default"} className="w-3/5 rounded-none hover:bg-success my-8 tracking-widest" >ADD TO CART</Button>
                            {/* </div> */}
                        </Link>
                        <AccordionProduct />
                    </div>
                </div>
            </Suspense>



        </section>
    );
};

export default Page;
