"use client";
import Text from "@/components/ui/typography/text";
import { Filter, X } from "lucide-react";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import React from "react";
import PriceFilter from "@/components/ui/custom/priceFilter";
import { Separator } from "@/components/ui/separator";
import Heading from "@/components/ui/typography/heading";
import CheckboxSelector from "@/components/ui/custom/checkboxSelector";
interface FilterProdutsProps {
    handleFilterValue: (value: number[]) => void
}
const FilterProducts: React.FC<FilterProdutsProps> = ({ handleFilterValue }) => {

    // --------------- FILTER BUTTON    --------------------
    const FilterButton = () => (
        <div className="flex items-center">
            <Filter className="mr-1 w-4 h-4 cursor-pointer" />
            <Text as="p" className="cursor-pointer">
                Filter
            </Text>
        </div>
    );

    return (
        <div className="">
            <Drawer direction="left">
                <DrawerTrigger>
                    <FilterButton />
                </DrawerTrigger>
                <DrawerContent className="top-0 mt-0 px-3 flex-col rounded-t-none   w-96 h-screen">
                    <DrawerHeader className=" text-white bg-black w-full flex items-center justify-between">
                        <DrawerTitle>Filter</DrawerTitle>
                        <DrawerClose>
                            <X />
                        </DrawerClose>
                    </DrawerHeader>
                    <PriceFilter handleFilterValue={handleFilterValue} />
                    {/* Category */}
                    <div>
                        <div className="">
                            <Heading as="h4" className="">
                                Category
                            </Heading>
                            <Separator className="bg-black h-[2px] w-20 mt-1" />
                        </div>
                        {/* <CheckboxSelector /> */}
                    </div>
                    {/* By Cloth */}
                    {/* <div>
                        <div className="">
                            <Heading as="h4" className="">
                                By Cloth
                            </Heading>
                            <Separator className="bg-black h-[2px] w-16 mt-1" />
                        </div>
                        <CheckboxSelector />
                    </div> */}
                    <DrawerFooter>
                        <DrawerClose>
                            <Button variant="outline">Cancel</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </div>
    );
};

export default FilterProducts;
