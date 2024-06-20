"use client";
import CardComp from "@/components/client/product/cardComp";

import Text from "@/components/ui/typography/text";
import React, { Suspense, useEffect } from "react";
import Loading from "./loading";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { fetchProducts } from "@/lib/redux/slices/product/productSlice";
import LoadingComp from "@/components/ui/custom/loadingComp";

interface PageProps {
  params: { slug: string };
}
const Page: React.FC<PageProps> = ({ params }) => {
  const dispatch = useAppDispatch();
  const param = params.slug;
  const decoded = param ? decodeURIComponent(param) : "";
  const { isLoading, error, products } = useAppSelector(
    (state) => state.products
  );
  useEffect(() => {
    dispatch(fetchProducts({ category: param }));
  }, [dispatch, param]);
  return (
    <div className="mb-8 container md:px-4 px-0">
      <Suspense fallback={<Loading />}>
        {/* <Text as="p" className="text-xs">
          Home / men
        </Text> */}
        {
          isLoading ? <LoadingComp /> :
            <CardComp param={decoded} products={products} />
        }
      </Suspense>
    </div>
  );
};

export default Page;
