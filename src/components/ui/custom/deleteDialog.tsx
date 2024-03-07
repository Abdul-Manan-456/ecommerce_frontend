import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

import { Button } from "../button";
import { ReactNode } from "react";
import { useAppDispatch } from "@/lib/redux/hooks";
import { deleteCategoryApi } from "@/lib/redux/slices/category/categoryApi";
import { useToast } from "../use-toast";

const DeleteDialog = ({
  children,
  _id,
}: {
  children: ReactNode;
  _id: string;
}) => {
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const handleDeleteClick = () =>
    dispatch(deleteCategoryApi({ _id: _id })).then(() =>
      toast({ description: "Category Deleted Successfully" })
    );
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>Do you want to delete the Category?</DialogHeader>
        <DialogDescription className="flex items-center justify-center">
          <DialogClose
            onClick={handleDeleteClick}
            className="w-20 h-9 bg-rose-500 text-black font-medium tracking-wider hover:bg-rose-700 rounded-sm "
          >
            Delete
          </DialogClose>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteDialog;
