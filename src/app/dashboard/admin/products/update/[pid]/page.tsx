"use client";
import Input from "@/components/ui/custom/Input";
import { Form, Formik } from "formik";
import Heading from "@/components/ui/typography/heading";
import { Textarea } from "@/components/ui/textarea";
import ImageUploader from "@/components/ui/custom/imageUploader";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { addProductApi, editProductApi, getSingleProductApi } from "@/lib/redux/slices/product/productApi";
import axios from "axios";
import { baseUrl } from "@/lib/config/apiConfig";
import React, { useEffect, useState } from "react";
import CategorySelector from "@/components/dashboard/category/categorySelector";
import { useToast } from "@/components/ui/use-toast";
import LoadingComp from "@/components/ui/custom/loadingComp";
import { useParams, usePathname, useRouter } from "next/navigation";

interface PageProps {
    params: {
        pid: string
    }
}
const Page: React.FC<PageProps> = ({ }) => {

    const dispatch = useAppDispatch();
    const { isLoading } = useAppSelector((state) => state.products);
    const params = useParams();
    const _id = params.pid;
    const router = useRouter()
    let imageApiResponce: { data: { url: string } };

    const { toast } = useToast();

    const [files, setFiles] = useState<File[]>([]);
    const [textValue, setTextValue] = useState("");
    const [item, setItem] = useState<{}>({})


    useEffect(() => {
        const fetchProduct = async () => {
            if (_id) {
                try {
                    const action = await dispatch(getSingleProductApi({ _id }));
                    const productArray = action.payload.result;
                    const productObj = productArray[0];
                    setTextValue(productObj.description)
                    setItem({
                        title: productObj.title,
                        // description: productObj.description,
                        price: productObj.price,
                        imageData: productObj.imageData,
                        category: productObj.category
                    })
                } catch (error) {
                    // Handle error if needed
                    console.error("Error fetching product:", error);
                }
            }
        };

        fetchProduct();
    }, [dispatch, _id]);


    //--------- IMAGE UPLOAD AND THE SAVE -----------------
    const handleImageUpload = async (values: object) => {
        try {
            const formData = new FormData();

            for (let i = 0; i < files.length; i++) {
                const file = files[i];

                formData.append("file", file);
            }
            // if (files && files.length > 0) {
            //     imageApiResponce = await axios.post(
            //         `${baseUrl}/upload/multiple`,
            //         formData
            //     );
            // }
            dispatch(
                editProductApi({
                    _id: _id as string,
                    ...values,
                    description: textValue,
                    // imageData: imageApiResponce?.data?.url,
                })
            ).then(() => toast({ description: "Product edited successfully" })).then(() => router.push("/dashboard/products"));
        } catch (error) {
            console.error("Error uploading image:", error);
        }
    };


    return isLoading ? (
        <LoadingComp />
    ) : (
        <div className="p-6 flex items-center justify-center">
            <div className="w-1/2">
                <Heading as="h4" className="mb-4">
                    Edit The Product
                </Heading>
                <Formik
                    initialValues={item}
                    onSubmit={(values) => {
                        handleImageUpload(values);
                        console.log("Add the Product", values);
                    }}
                    enableReinitialize
                >
                    {(props) => (
                        <Form className="space-y-5">
                            <Input name="title" placeholder="Title" label="Title" />
                            <CategorySelector />
                            <Textarea
                                placeholder="Add Product Description"
                                value={textValue}
                                onChange={(e) => setTextValue(e.target.value)}
                                className="h-32"
                            ></Textarea>

                            {/* <ImageUploader files={files} setFiles={setFiles} /> */}
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
