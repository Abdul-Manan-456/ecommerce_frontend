import Input from "@/components/ui/custom/Input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";

import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { deleteProductApi } from "@/lib/redux/slices/product/productApi";
import { DialogClose } from "@radix-ui/react-dialog";

import React, { ReactNode } from "react";
interface DeleteProductProps {
  selectedProductId: string[]
  children: ReactNode
}
const DeleteProduct: React.FC<DeleteProductProps> = ({ children, selectedProductId }) => {
  const dispatch = useAppDispatch();
  // const _id = selected
  const handleDeleteProduct = () => {

    dispatch(deleteProductApi({ _id: selectedProductId[0] })).then(() => {
      toast({ description: "Product deleted successfully" });
    });

  };

  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="w-[1100px] border border-black">
        <DialogHeader>
          <DialogTitle>Product will be deleted permanently</DialogTitle>
        </DialogHeader>
        <DialogClose
          onClick={handleDeleteProduct}
          className="w-24 h-10 bg-rose-600 text-white hover:bg-rose-700 cursor:pointer"
        >
          Delete
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteProduct;
