import {
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Heading from "@/components/ui/typography/heading";
import Text from "@/components/ui/typography/text";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { REMOVE_CART_ITEMS } from "@/lib/redux/slices/cart/cartSlice";
import { useFormikContext } from "formik";
import Image from "next/image";
import Link from "next/link";

const SummaryCheckout = () => {
    const items = useAppSelector((state) => state.cart.items);
    const dispatch = useAppDispatch();
    const { isSubmitting, isValid } = useFormikContext();
    const { totalPrice } = useAppSelector((state) => state.cart);
    return (
        <div className=" relative bg-white box_shadow px-3  box-border rounded-sm h-[85vh] overflow-y-auto overflow-x-hidden custom_scrollbar overflow-scroll">
            <AccordionItem value="item-4" className="border-b-0 py-0">
                <div className=" bg-white sticky top-0 left-0">
                    <AccordionTrigger className="z-20 ">
                        <Heading as="h5">Your cart</Heading>
                    </AccordionTrigger>
                    <Separator />
                </div>
                <AccordionContent className="">
                    <div>
                        {items.map((product, index) => (
                            <div key={index} className="grid grid-cols-3  my-4">
                                <div className="w-[100px] flex items-start min-h-[120px]">
                                    <Image
                                        src={product?.image}
                                        className="min-h-150"
                                        width={200}
                                        height={100}
                                        alt="menshop"
                                    />
                                </div>
                                <div className="col-span-2 text-sm  ">
                                    <Text as="p" className="font-bold leading-5">
                                        {product?.desc}
                                    </Text>
                                    <div className="grid grid-cols-2 text-sm">
                                        <Text as="p" className="leading-5">
                                            Price
                                        </Text>
                                        <Text as="p" className="leading-5">
                                            Rs.{product.price}
                                        </Text>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2">
                                        <Text as="p" className="leading-5">
                                            Qty
                                        </Text>
                                        <Text as="p">{product.quantity || 1}</Text>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2 leading-5">
                                        <Text as="p" className="leading-5">
                                            Item Total
                                        </Text>
                                        <Text as="p" className="leading-4">
                                            Rs. {product.quantity * product.price}
                                        </Text>
                                    </div>
                                </div>
                                <Separator className="w-full mt-4 col-span-3" />
                            </div>
                        ))}
                    </div>
                    <div>
                        <div className="flex items-center justify-between">
                            <Text as="p">Sub Total</Text>
                            <Text as="p">Rs. {totalPrice}</Text>
                        </div>
                        <div className="flex items-center justify-between">
                            <Text as="p">Shipping</Text>
                            <Text as="p">Rs.0</Text>
                        </div>
                        <Separator className="my-3" />
                        <div className="flex items-center justify-between">
                            <Heading as="h5">Total</Heading>
                            <Heading as="h5">Rs. {totalPrice}</Heading>
                        </div>
                    </div>
                </AccordionContent>
            </AccordionItem>
            <div className="sticky bottom-0 w-full h-20 bg-white">
                <Button
                    onClick={() => dispatch(REMOVE_CART_ITEMS())}
                    disabled={isSubmitting || !isValid}
                    className=" rounded-none hover:bg-success w-full mt-4"
                >
                    <Link className="w-full p-2" type="submit" href="/">
                        Place Order
                    </Link>
                </Button>
            </div>
        </div>
    );
};

export default SummaryCheckout;
