"use client";
import CardComp from "@/components/client/product/cardComp";

import Text from "@/components/ui/typography/text";
import React, { Suspense, useEffect, useState } from "react";
import Loading from "./loading";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { fetchProducts } from "@/lib/redux/slices/product/productSlice";
import LoadingComp from "@/components/ui/custom/loadingComp";
import { useParams } from "next/navigation";
import axios from "axios";
import { baseUrl } from "@/lib/config/apiConfig";
interface Product {
    _id: string;
    description: string;
    title: string;
    price: number;
    category: string;
    imageData: string[];
}
interface PageProps {
    params: {
        title: string
    }
}
const Page: React.FC<PageProps> = () => {
    const dispatch = useAppDispatch();
    const params = useParams();
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [products, setProducts] = useState<Product[]>([]);
    const decodedParam = params ? decodeURIComponent(params.title as string) : "";

    useEffect(() => {
        const fetchSearch = async () => {
            if (decodedParam) {
                try {
                    setIsLoading(true);
                    const response = await axios.get(
                        `${baseUrl}/product/search?title=${decodedParam}`
                    );
                    setIsLoading(false);
                    setProducts(response?.data?.result);
                } catch (error: any) {
                    console.log(error);
                    setError(error);
                }
            }
        }
        fetchSearch();
    }, [decodedParam]);
    return (
        <div className="p-4 mb-8 container ">
            <Suspense fallback={<Loading />}>
                <Text as="p" className="text-xs">
                    Home / men
                </Text>
                {
                    isLoading ? <LoadingComp /> :
                        <CardComp param={"Searched Products"} products={products} />
                }
            </Suspense>
        </div>
    );
};

export default Page;
