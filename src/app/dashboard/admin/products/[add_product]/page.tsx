"use client";
import Input from "@/components/ui/custom/Input";
import { Form, Formik } from "formik";
import Heading from "@/components/ui/typography/heading";
import { Textarea } from "@/components/ui/textarea";
import ImageUploader from "@/components/ui/custom/imageUploader";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { addProductApi } from "@/lib/redux/slices/product/productApi";
import axios from "axios";
import { baseUrl } from "@/lib/config/apiConfig";
import React, { useEffect, useState } from "react";
import CategorySelector from "@/components/dashboard/category/categorySelector";
import { useToast } from "@/components/ui/use-toast";
import LoadingComp from "@/components/ui/custom/loadingComp";
import productValidationSchema from "@/lib/schema/productSchema";

interface PageProps {
  params: {
    productId: string
  }
}
const Page: React.FC<PageProps> = ({ params }) => {

  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.products);

  let imageApiResponce: { data: { url: string } };


  const { toast } = useToast();

  const [files, setFiles] = useState<File[]>([]);
  const [textValue, setTextValue] = useState("");
  useEffect(() => {

  }, [])

  //--------- IMAGE UPLOAD AND THE SAVE -----------------
  const handleImageUpload = async (values: object) => {
    try {

      const formData = new FormData();

      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        formData.append("file", file);
      }
      if (files && files.length > 0) {
        imageApiResponce = await axios.post(
          `${baseUrl}/upload/multiple`,
          formData
        );
      }
      dispatch(
        addProductApi({
          ...values,
          description: textValue,
          imageData: imageApiResponce?.data?.url,
        })
      ).then(() => (toast({ description: "Product added successfully" }), setFiles([]), setTextValue('')))
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };




  const initialValues = {
    title: "",
    category: "",
    imageData: [],
    description: "",
    price: "",
  }
  return isLoading ? (
    <LoadingComp />
  ) : (
    <div className="p-6 container flex items-center justify-center">
      <div className="w-1/2">
        <Heading as="h4" className="mb-4">
          Add the product
        </Heading>
        <Formik
          initialValues={initialValues}
          onSubmit={(values) => {
            handleImageUpload(values);
          }} validationSchema={productValidationSchema}

        >
          {(props) => (
            <Form className="space-y-5">
              <Input name="title" placeholder="Title" label="Title" />
              <CategorySelector />
              <Textarea
                // name="description"
                placeholder="Add Product Description"
                value={textValue}
                onChange={(e) => setTextValue(e.target.value)}
                className="h-32"
                required
              ></Textarea>

              <ImageUploader files={files} setFiles={setFiles} />
              <Input name="price" placeholder="Price" label="Price" />
              <Button type="submit" className="hover:bg-success rounded-none">
                Save
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Page;
