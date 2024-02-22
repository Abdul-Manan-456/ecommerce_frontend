import { CardContent, Card } from "@/components/ui/card";
import Text from "@/components/ui/typography/text";
import FilterProducts from "@/components/client/collections/FilterProducts";
import Image from "next/image";
import Sorting from "@/components/ui/custom/sorting";
import Heading from "@/components/ui/typography/heading";
import AddCartIcon from "../../../../public/icons/AddCartIcon";
import Link from "next/link";
import { useAppDispatch, } from "@/lib/redux/hooks";
import { ADD_TO_CART } from "@/lib/redux/slices/cart/cartSlice";
import React, { useEffect, useState } from "react";
import { GET_PRODUCT_BY_ID } from "@/lib/redux/slices/productSlice";
interface CardProps {
    param: string
    products: {
        _id: string
        image: string
        description: string;
        title: string;
        price: number;
        category: string;
    }[];
}
const CardComp: React.FC<CardProps> = ({ param, products }) => {
    const dispatch = useAppDispatch();
    const [sortedProducts, setSortedProducts] = useState([...products]);
    const [sortValue, setSortValue] = useState('')
    const handleSortValue = (value: string) => {
        setSortValue(value)
    }

    // -------------- FILTER THE PRODUCTS --------------------------
    const handleFilterValue = ([minPrice, maxPrice]: number[]) => {
        const filteredProducts = products.filter(product => {
            const productPrice = product.price;
            return productPrice >= minPrice && productPrice <= maxPrice;
        });
        setSortedProducts(filteredProducts);
    }
    useEffect(() => {
        const sorted = [...products].sort((a, b) => {
            if (sortValue === 'asc') {
                return a.title.localeCompare(b.title);
            } else if (sortValue === 'lth') {
                return a.price - b.price
            } else if (sortValue === 'htl') {
                return b.price - a.price
            } else {
                return b.title.localeCompare(a.title);
            }
        });
        setSortedProducts(sorted);
    }, [sortValue, products])

    return (
        <div>
            <Heading as="h2" className="text-center mb-12 capitalize">
                {param}
            </Heading>
            <div className="flex items-center justify-between mt-4 mb-12">
                <FilterProducts handleFilterValue={handleFilterValue} />
                <Sorting handleSortValue={handleSortValue} />
            </div>
            <div className="grid grid-cols-4 w-full gap-12">
                {sortedProducts.map((product, index) => (
                    <Card
                        key={index}
                        className="border-none group relative rounded-none h-[450px] "
                    >
                        <CardContent className="h-full p-0">
                            <div onClick={() => dispatch(GET_PRODUCT_BY_ID(product))} className="h-96 overflow-hidden relative cursor-pointer">
                                <Link href={`/collections/${param}/product_details/${product._id}`}>
                                    <Image
                                        src={product.image}
                                        fill={true}
                                        sizes="100vh"
                                        className={`transition duration-300 ease-in-out hover:scale-110`}
                                        alt=""
                                    />
                                </Link>

                            </div>
                            <div>
                                <Heading as="h5" className="p-0 m-0 h-10 overflow-hidden text-sm">
                                    {product?.title}
                                </Heading>
                                <Text as="p" className="text-sm">
                                    Rs. {product?.price}
                                </Text>
                            </div>
                            <Link href="/cart">
                                <div
                                    onClick={() => dispatch(ADD_TO_CART(product))}
                                    className="absolute hover:text-white cursor-pointer w-36 h-12 rounded-sm border group opacity-0 group-hover:opacity-100  bottom-16  bg-slate-900/30 hover:bg-slate-900/95 left-0 flex  justify-center items-center transform translate-x-1/2 group-hover:-translate-y-16 group-hover:ease-in-out transition-transform duration-700"
                                >
                                    <AddCartIcon className="text-2xl font-bold text-natural-800 " />
                                </div>
                            </Link>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default CardComp;
