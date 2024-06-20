"use client";

import AccordionProduct from "@/components/client/product/accordionProduct";
import ProductDetailsCarousel from "@/components/client/product/productDetailsCarousel";
import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/typography/heading";
import { Suspense, useEffect, useState } from "react";
import Loading from "./loading";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import Link from "next/link";
import { ADD_TO_CART } from "@/lib/redux/slices/client/cart/cartSlice";
import { useParams } from "next/navigation";
import { getSingleProductApi } from "@/lib/redux/slices/product/productApi";
import { string } from "yup";
interface ProductProps {
  title: string
  price: string
  imageData: []
  description: string
}
const Page = () => {
  const { isLoading } = useAppSelector((state) => state.products);
  const dispatch = useAppDispatch()
  const params = useParams();
  const [selectedProduct, setSelectedProduct] = useState<ProductProps>({
    title: '',
    price: '',
    imageData: [],
    description: ''
  })


  useEffect(() => {
    dispatch(getSingleProductApi({ _id: params.id })).then((data) => setSelectedProduct(data.payload?.result))
  }, [dispatch, params.id])


  const [value, setValue] = useState(1);
  const handleIncrement = () => {
    setValue(value + 1);
  };
  const handleDecrement = () => {
    if (value > 1) setValue(value - 1);
  };

  return (
    <section className="container">
      {/* <div>Home/men/shoes/Product_details</div> */}
      <Suspense fallback={<Loading />}>
        <div className="grid grid-cols-2 gap-8 p-4">
          <ProductDetailsCarousel selectedProduct={selectedProduct} />
          <div>
            <Heading as="h4" className="mb-2 capitalize">
              {selectedProduct?.title}
            </Heading>
            <Heading as="h4" className="mb-6 capitalize">
              Rs. {selectedProduct?.price}
            </Heading>
            <Heading as="h6" className="mb-2">
              Quantity
            </Heading>
            <div className="font-medium grid grid-cols-4 h-8 place-items-center select-none rounded-full w-28 border">
              <p
                onClick={handleDecrement}
                className="border-r cursor-pointer px-3 select-none"
              >
                -
              </p>
              <p className=" col-span-2">{value}</p>
              <p
                onClick={handleIncrement}
                className="border-l px-3 cursor-pointer select-none"
              >
                +
              </p>
            </div>
            {/* <Text as="muted" className="my-2">Size</Text>
                        <div className="flex items-center ">
                            <div className="w-8 h-8 mr-2 border flex items-center justify-center cursor-pointer rounded-md">S</div>
                            <div className="w-8 h-8  mr-2 border flex items-center justify-center cursor-pointer rounded-md">M</div>
                            <div className="w-8 h-8  mr-2 border flex items-center justify-center cursor-pointer  rounded-md">L</div>
                        </div> */}
            {/* <div className="flex items-center justify-center"> */}
            <Link
              onClick={() =>
                dispatch(ADD_TO_CART({ ...selectedProduct, quantity: value }))
              }
              href="/cart"
            >
              <Button
                variant={"default"}
                className="w-3/5 rounded-none hover:bg-success my-8 tracking-widest"
              >
                ADD TO CART
              </Button>
              {/* </div> */}
            </Link>
            <AccordionProduct selectedProduct={selectedProduct} />
          </div>
        </div>
      </Suspense>
    </section>
  );
};

export default Page;
