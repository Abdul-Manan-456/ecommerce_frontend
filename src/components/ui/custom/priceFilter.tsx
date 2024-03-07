import { Slider } from "@/components/ui/slider";
import React, { useState } from "react";
import Heading from "@/components/ui/typography/heading";
import { DrawerClose } from "@/components/ui/drawer";
import { Button } from "../button";
import { Separator } from "../separator";
interface FilterProdutsProps {
    handleFilterValue: (value: number[]) => void;
}

const PriceFilter: React.FC<FilterProdutsProps> = ({ handleFilterValue }) => {
    const [priceRange, setPriceRange] = useState<number[]>([0, 1000]);

    return (
        <div className="mt-3 mb-8">
            <div className="items-center">
                <Heading as="h5" className="text-gray-600 ">
                    Price
                </Heading>
                <Separator className="bg-gray-600 h-[1px] w-10 mt-1" />
            </div>
            <div className="w-full flex flex-col items-center my-4">
                <div className="flex items-center justify-center w-full">
                    <Slider
                        defaultValue={[0, 5000]}
                        max={5000}
                        onValueChange={(value) => {
                            setPriceRange(value);
                        }}
                        className="cursor-pointer w-[80%]"
                        step={100}
                    />
                </div>
                <div className="flex w-[80%] justify-between">
                    <Heading as="h4">Rs.{priceRange.at(0)}</Heading>
                    <Heading as="h4">Rs. {priceRange.at(1)}</Heading>
                </div>
                <DrawerClose onClick={() => handleFilterValue(priceRange)} className="mt-4  border w-[80%]">
                    <Button
                        variant={"default"}
                        className="hover:bg-success w-full rounded-none tracking-wider text-md"
                    >
                        Filter
                    </Button>
                </DrawerClose>
            </div>
            <Separator />
        </div>
    );
};

export default PriceFilter;
