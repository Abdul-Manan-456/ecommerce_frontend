import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/typography/heading";
import Text from "@/components/ui/typography/text";
import { Textarea } from "@/components/ui/textarea";
import CartDetails from "./cartDetails";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import Link from "next/link";
import React, { useState } from "react";
import { CHECKOUT_CART } from "@/lib/redux/slices/client/cart/cartSlice";
const Cart = () => {
  const buttonsData = [
    { text: "Continue Shopping", link: "/" },
    { text: "Checkout", link: "/checkout" },
  ];
  const items = useAppSelector((state) => state.cart.items);
  const cart = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  // const [checkoutCart, setCheckoutCart] = useState({})
  const [textareaValue, setTestareaValue] = useState("");

  const handleCheckoutCart = () => {
    dispatch(CHECKOUT_CART(textareaValue));
    // const products = items.map(item => (
    //     {
    //         _id: item._id,
    //         quantity: item.quantity
    //     }
    // ))
    // return {
    //     products,
    //     textareaValue
    // }
  };

  const handleTextareaValue = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setTestareaValue(e.target.value);
  };
  return (
    <div className="flex  flex-col items-center p-8">
      <div>
        <h3 className="font-bold text-2xl mb-0.5">Your Cart</h3>
        <div className=" w-full border border-black rounded-full"></div>
      </div>

      {/* Cart Details and Order Summary */}
      <div className="w-full mt-8 grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <CartDetails />
        </div>
        {/* Order Summary */}
        <div className="">
          <Heading className="mb-4 text-center" as="h4">
            Order Summary
          </Heading>

          <Text as="p" className="text-sm">
            Order Notes
          </Text>
          <Textarea
            onChange={(e) => handleTextareaValue(e)}
            className="h-28"
            placeholder="Please Leave Special Instruction"
          />

          <div className="grid grid-cols-2">
            <Heading className="my-4" as="h4">
              Total
            </Heading>
            <Heading className="my-4 text-right" as="h4">
              Rs. {cart.totalPrice}
            </Heading>
          </div>
          <div className="grid grid-rows-2 gap-4 place-items-center">
            {buttonsData.map((button, index) => (
              <div key={index} className="">
                <Link href={button.link}>
                  <Button
                    onClick={
                      button.text === "Checkout"
                        ? handleCheckoutCart
                        : undefined
                    }
                    variant={"default"}
                    className="w-48 rounded-none hover:bg-success"
                  >
                    {button.text}
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
