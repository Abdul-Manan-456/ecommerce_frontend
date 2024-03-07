"use client";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import {

  fetchProducts,
} from "@/lib/redux/slices/product/productSlice";
import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";

interface ProductTableProps {
  handleProductSelection: (arg: string) => void
}
const ProductsTable: React.FC<ProductTableProps> = ({ handleProductSelection }) => {
  const { products } = useAppSelector((state) => state.products);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div>
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50]">Items</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-center">Title</TableHead>
              <TableHead className="text-center">Description</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products && products.map((product) => (
              <TableRow key={product._id}>
                <TableCell className="font-medium">
                  <Checkbox onClick={() => handleProductSelection(product._id)} />
                </TableCell>
                <TableCell>
                  <Image
                    src={product.imageData[0]}
                    width={50}
                    height={100}
                    alt="image"
                  />
                </TableCell>
                <TableCell>{product?.populatedCategory?.category}</TableCell>
                <TableCell className="text-left">{product.title}</TableCell>
                <TableCell className="text-left">
                  {product.description}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default ProductsTable;
