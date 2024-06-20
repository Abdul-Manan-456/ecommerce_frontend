import { CardContent, Card } from "@/components/ui/card";
import Heading from "@/components/ui/typography/heading";
import Text from "@/components/ui/typography/text";
import Image from "next/image";
import AddCartIcon from "../../../../public/icons/AddCartIcon";
import Link from "next/link";
import { useAppDispatch } from "@/lib/redux/hooks";
import { ADD_TO_CART } from "@/lib/redux/slices/client/cart/cartSlice";
import React, { Suspense } from "react";
import { GET_PRODUCT_BY_ID } from "@/lib/redux/slices/product/productSlice";
import LoadingComp from "@/components/ui/custom/loadingComp";
interface Products {
}
interface CardProps {
  separatedCategories?: Record<string, any[]>;
  products: Products;
}

//-------------- CARD COMPONENT --------------------------------
const LandCardComp: React.FC<CardProps> = ({ separatedCategories }) => {
  const dispatch = useAppDispatch();
  const categories = separatedCategories
    ? Object.entries(separatedCategories)
    : [];
  return (
    <div className="">
      {categories.map(([category, products], index) => (
        <div className="" key={category}>
          <Heading as="h2" className="text-center pt-12 mb-12 capitalize ">
            {category}
          </Heading>
          <div className="grid md:grid-cols-4 grid-cols-2 gap-x-4 w-full lg:gap-x-6 gap-y-12  md:gap-x-6 ">
            {products.map((product, index) => (
              <Card
                key={index}
                className="group relative rounded-none max-h-[480px] "
              >
                <CardContent className="h-full p-0">
                  <Link
                    onClick={() => dispatch(GET_PRODUCT_BY_ID(product))}
                    href={`/collections/${category}/product_details/${product._id}`}
                  >

                    <div className="border-none max-h-[380px] overflow-hidden relative cursor-pointer ">
                      <Image
                        src={product.imageData[0]}
                        width={500}
                        height={700}
                        sizes="100vw"
                        className={`transition h-auto duration-300 ease-in-out hover:scale-110`}
                        alt=""
                      />
                    </div>
                  </Link>

                  <div className="overflow-hidden px-1">
                    <Heading
                      as="h3"
                      className="p-0 m-0 font-bold sm:text-base text-sm capitalize h-12 sm:h-14 line-clamp-2 overflow-hidden pt-2"
                    >
                      {product?.title}
                    </Heading>
                    <Text as="p" className="sm:text-base text-sm sm:font-medium font-bold pt-2">
                      Rs. {product?.price}
                    </Text>
                  </div>
                  <Link href="/cart">
                    <div
                      onClick={() => dispatch(ADD_TO_CART(product))}
                      className="absolute hover:text-white cursor-pointer w-36 h-12 rounded-sm border group opacity-0 group-hover:opacity-100  bottom-28  bg-slate-900/30 hover:bg-slate-900/95 left-0 flex  justify-center items-center transform translate-x-1/2 group-hover:-translate-y-4 group-hover:ease-in-out transition-transform duration-300"
                    >
                      <AddCartIcon className="text-2xl font-bold text-natural-800 " />
                    </div>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default LandCardComp;
