'use client'
import { CarouselLanding } from "@/components/client/landing/carouselLanding";
import ProductLanding from "@/components/client/product/productLanding";
import { Suspense, useEffect } from "react";
import Loading from "./loading";
import { useAppDispatch } from "@/lib/redux/hooks";
import axios from "axios";
import { GET_CART_ITEMS } from "@/lib/redux/slices/client/cart/cartSlice";

// -------------  HOME ------------------------
export default function Home() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(GET_CART_ITEMS());
  }, [dispatch])
  return (
    <main className="">
      <Suspense fallback={<Loading />}>
        <CarouselLanding />
        <ProductLanding />
      </Suspense>
    </main>
  );
}
