"use client";
import Cart from "@/components/client/cart/cart";
import EmptyCart from "@/components/client/cart/emptyCart";
import { Suspense, useEffect, useRef, useState } from "react";
import Loading from "./loading";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { GET_CART_ITEMS } from "@/lib/redux/slices/client/cart/cartSlice";

const Page = () => {
  const { items } = useAppSelector((state) => state.cart);
  const [loading, setLoading] = useState(true);
  const [parsedItems, setParsedItems] = useState<any[]>([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(GET_CART_ITEMS());
    setLoading(false);
  }, [dispatch]);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <Suspense fallback={<Loading />}>
          {items.length === 0 ? <EmptyCart /> : <Cart />}
        </Suspense>
      )}
    </div>
  );
};

export default Page;
