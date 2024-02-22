"use client";

import AccordionProduct from "@/components/client/product/accordionProduct";
import ProductDetailsCarousel from "@/components/client/product/productDetailsCarousel";
import { Button } from "@/components/ui/button";
import QuantitySelector from "@/components/ui/quantitySelector";
import Heading from "@/components/ui/typography/heading";
import Text from "@/components/ui/typography/text";





const Page = () => {

    return (
        <section >
            {/* <div>Home/men/shoes/Product_details</div> */}
            <div className="grid grid-cols-2 gap-8 p-4">
                <ProductDetailsCarousel />
                <div>
                    <Heading as="h4" className="mb-2">3 piece embroided kurta</Heading>
                    <Heading as="h4" className="mb-6">Rs. 88934</Heading>
                    <Heading as="h6" className="mb-2">Quantity</Heading>
                    <QuantitySelector quantity={5} />
                    <Text as="muted" className="my-2">Size</Text>
                    <div className="flex items-center ">
                        <div className="w-8 h-8 mr-2 border flex items-center justify-center cursor-pointer rounded-md">S</div>
                        <div className="w-8 h-8  mr-2 border flex items-center justify-center cursor-pointer rounded-md">M</div>
                        <div className="w-8 h-8  mr-2 border flex items-center justify-center cursor-pointer  rounded-md">L</div>
                    </div>
                    {/* <div className="flex items-center justify-center"> */}
                    <Button variant={"default"} className="w-3/5 rounded-none hover:bg-success my-8 tracking-widest" >ADD TO CART</Button>
                    {/* </div> */}
                    <AccordionProduct />
                </div>
            </div>


        </section>
    );
};

export default Page;
