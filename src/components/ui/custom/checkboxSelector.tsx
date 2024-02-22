"use client";

import {
    DrawerClose,
} from "@/components/ui/drawer";
import { Separator } from "@/components/ui/separator";
import Heading from "@/components/ui/typography/heading";

import { Checkbox } from "@/components/ui/checkbox";

const CheckboxSelector = () => (
    <div>

        <DrawerClose className="flex items-center space-x-2 my-2">
            <Checkbox id="women" />
            <label
                htmlFor="women"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
                Women
            </label>
        </DrawerClose>


        <DrawerClose className="flex items-center space-x-2 my-2">
            <Checkbox id="men" />
            <label
                htmlFor="men"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
                Men
            </label>
        </DrawerClose>
        <Separator className="my-7" />
    </div>
);
export default CheckboxSelector