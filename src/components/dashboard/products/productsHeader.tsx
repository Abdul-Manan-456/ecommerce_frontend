"use client";
import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/typography/heading";
import EditPen from "../../../../public/icons/EditPen";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { useToast } from "@/components/ui/use-toast";
import DeleteProduct from "./deleteProduct";
import React from "react";


interface ProductsHeaderProps {
  selectedProductId: string[]

}
const ProductsHeader: React.FC<ProductsHeaderProps> = ({ selectedProductId }) => {
  const router = useRouter();
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const navigateAddProducts = () => {
    router.push("/dashboard/products/add-products");
  };

  const isDisabled = selectedProductId.length === 0 || selectedProductId.length > 1;
  const css = !isDisabled ? "text-black" : "text-gray-500";

  const handleDeleteProduct = () => {

    if (isDisabled) {
      return toast({
        description: "Please select a Single product",
      });
    }
  };
  const navigateEditProduct = () => {
    if (isDisabled) {
      return toast({
        description: "Please select a Single product",
      });
    }
    router.push(`/dashboard/products/update/${selectedProductId}`)

  };
  return (
    <div className="flex items-center justify-between mb-3">
      <Heading as="h4">Products</Heading>
      <div className="flex items-center space-x-2 ">
        <EditPen
          onClick={navigateEditProduct}
          className={`w-4 h-4 cursor-pointer`}
        />

        <div onClick={handleDeleteProduct}>
          <div className={`${isDisabled ? "pointer-events-none opacity-50" : ""}`}>
            <DeleteProduct selectedProductId={selectedProductId}>
              <Trash className={`w-4 h-4 cursor-pointer hover:text-rose-500 ${isDisabled ? " opacity-50" : ""}`} />
            </DeleteProduct>
          </div>
        </div>

        <div
          onClick={navigateAddProducts}
          className="hover:bg-success cursor-pointer w-32 flex items-center justify-center h-10 bg-black text-base rounded-sm text-white  "
        >
          + Add Products
        </div>
      </div>
    </div>
  );
};

export default ProductsHeader;
