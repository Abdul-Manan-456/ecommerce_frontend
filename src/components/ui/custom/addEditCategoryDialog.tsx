"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";

import { ReactNode, useEffect } from "react";
import { Form, Formik } from "formik";
import Input from "./Input";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import {
  addCategory,
  editCategoryApi,
} from "@/lib/redux/slices/category/categoryApi";
import { useToast } from "../use-toast";
interface AddEditCategoryDialogProps {
  children: ReactNode;
  mode: "add" | "edit";
  _id?: string;
}
const AddEditCategoryDialog = ({
  children,
  mode,
  _id,
}: AddEditCategoryDialogProps) => {
  const dispatch = useAppDispatch();
  const { toast } = useToast();

  const handleSubmition = (values: any) => {
    if (mode === "add") {
      dispatch(addCategory(values))
        .then(() => {
          toast({
            description: "Category Updated Successfully",
          });
        })
        .catch((error) => {
          toast({
            variant: "destructive",
            description: "Error Plese try again",
          });
        });
    } else {
      if (_id) {
        dispatch(editCategoryApi({ _id: _id, category: values.category }))
          .then(() => {
            toast({
              description: "Category Updated Successfully",
            });
          })
          .catch((error) => {
            toast({
              variant: "destructive",
              description: "Error Plese try again",
            });
          });
      } else {
        throw new Error("Cannot edit category without _id.");
      }
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          {" "}
          {mode === "add" ? "Add new Category" : "Edit Category"}
        </DialogHeader>
        <Formik
          initialValues={{
            category: "",
          }}
          onSubmit={(values) => handleSubmition(values)}
        >
          <Form>
            <Input label="Category" name="category" placeholder="Category" />
            <DialogDescription className="flex items-center justify-center">
              <DialogClose
                className="w-20 h-10 hover:bg-success bg-zinc-300 text-black mt-3"
                type="submit"
              >
                {mode === "add" ? "Add" : "Edit"}
              </DialogClose>
            </DialogDescription>
          </Form>
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default AddEditCategoryDialog;
