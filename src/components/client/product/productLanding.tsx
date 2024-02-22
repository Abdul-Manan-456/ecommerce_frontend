"use client";
import Heading from "@/components/ui/typography/heading";
import LandingCardComp from "./landingCardComp";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import React, { useEffect } from "react";
import { fetchProducts } from "@/lib/redux/slices/productSlice";
import LoadingComp from "@/components/ui/custom/loadingComp";
interface Product {
    // id: number;
    // title: string;
    // description: string;
    // price: number;
    // category: string;
    // image: string;
}

const ProductLanding: React.FC<Product> = () => {
    const { error, isLoading, products } = useAppSelector(
        (state) => state.products
    );
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);
    // ----------- Taking the categories -------------
    const categories = [
        ...new Set(products.map((product) => product.category)),
    ];
    //------------- Separate the categories---------
    const separatedCategories: Record<string, any[]> = {};
    categories.forEach((category) => {
        separatedCategories[category] = products.filter((product) => product.category === category);
    });
    return (
        <div className="p-12">
            {
                isLoading ? <LoadingComp /> : <LandingCardComp products={products} separatedCategories={separatedCategories} />
            }

        </div >
    );
};

export default ProductLanding;
