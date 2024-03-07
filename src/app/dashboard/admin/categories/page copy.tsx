"use client";
import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/typography/heading";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Pencil, Trash2 } from "lucide-react";

import DeleteDialog from "@/components/ui/custom/deleteDialog";
import AddEditCategoryDialog from "@/components/ui/custom/addEditCategoryDialog";
import { Suspense, useEffect } from "react";

import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { fetchCategoryApi } from "@/lib/redux/slices/category/categoryApi";
import LoadingComp from "@/components/ui/custom/loadingComp";
import Loading from "./loading";

const Page = () => {
  const { category, isLoading } = useAppSelector((state) => state.category);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCategoryApi());
  }, [dispatch]);

  function TableData() {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead >Name</TableHead>
            <TableHead>Edit</TableHead>
            <TableHead >Delete</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {category && category.length > 0 &&
            [...category].reverse().map((item) => (
              <TableRow key={item._id}>
                <TableCell className="font-medium">{item.category}</TableCell>
                <TableCell >
                  <AddEditCategoryDialog mode="edit" _id={item._id}>
                    <Pencil className="text-xs w-4 cursor-pointer" />
                  </AddEditCategoryDialog>
                </TableCell>
                <TableCell>
                  <DeleteDialog _id={item._id}>
                    <Trash2 className="w-4 cursor-pointer hover:text-rose-500" />
                  </DeleteDialog>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    );
  }
  function LoadingDataManager() {
    return (
      <>
        {isLoading ? (
          <div className="flex items-center justify-center border-border-black">
            <LoadingComp />
          </div>
        ) : category && category.length === 0 ? (
          <Heading as="h3" className="text-center py-7">
            No category Found Add the category
          </Heading>
        ) : (
          <TableData />
        )}
      </>
    );
  }

  return (
    <Suspense fallback={<Loading />}>
      <div className="p-6">
        <div className="w-[600px]">
          <div className="flex items-center justify-between">
            <Heading as="h3">Categories</Heading>
            <AddEditCategoryDialog mode="add">
              <Button className="rounded-none hover:bg-success">
                {" "}
                + Add Category{" "}
              </Button>
            </AddEditCategoryDialog>
          </div>
          <Card className="mt-4">
            {
              isLoading && <div className="flex items-center justify-center border-border-black">
                <LoadingComp />
              </div>
            }
            {
              category && category.length > 0 && <TableData />
            }
            {/* <LoadingDataManager /> */}
          </Card>
        </div>
      </div>
    </Suspense>
  );
};

export default Page;
