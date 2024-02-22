'use client'
import { CarouselLanding } from "@/components/client/landing/carouselLanding";
import ProductLanding from "@/components/client/product/productLanding";
import { Suspense, useEffect } from "react";
import Loading from "./loading";
import { useAppDispatch } from "@/lib/redux/hooks";
import axios from "axios";

// -------------  HOME ------------------------
export default function Home() {
  useEffect(() => {
    const cart = localStorage.getItem("cart");
    async () => {
      // const response = axios.get("https://ecommerce-backend-j8v696v1w-abdul-manan-456s-projects.vercel.app/api/v1/product")
      // console.log("response---------", response)
    }

  }, [])
  return (
    <main className="">
      <Suspense fallback={<Loading />}>
        <CarouselLanding />
        <ProductLanding />
      </Suspense>
    </main>
  );
}
