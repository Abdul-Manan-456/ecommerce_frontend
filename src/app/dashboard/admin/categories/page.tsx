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
import { Suspense, useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { fetchCategoryApi } from "@/lib/redux/slices/category/categoryApi";
import LoadingComp from "@/components/ui/custom/loadingComp";
import Loading from "./loading";

const Page = () => {
  const { category, isLoading } = useAppSelector((state) => state.category);
  const dispatch = useAppDispatch();
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (typeof window !== "undefined") {
      (async () => await dispatch(fetchCategoryApi()))();
    }
  }, [dispatch]);



  return (
    isClient && <div className="p-6 w-[600px]" suppressHydrationWarning={true}>
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
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead >Name</TableHead>
              <TableHead>Edit</TableHead>
              <TableHead >Delete</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody >
            {
              isLoading ? <LoadingComp /> : category && category.length > 0 &&
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
                ))
            }
          </TableBody>
        </Table>
      </Card>
    </div>


  );
};

export default Page;
