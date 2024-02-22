"use client";
import CustomerDetails from "@/components/client/checkout/customerDetails";
import SummaryCheckout from "@/components/client/checkout/summaryCheckout";
import { Accordion } from "@/components/ui/accordion";
import { Suspense, useEffect } from "react";
import Loading from "./loading";
import { Form, Formik } from "formik";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { checkoutApi } from "@/lib/redux/slices/checkout/checkoutApi";
import { useToast } from "@/components/ui/use-toast";
import checkoutSchema from "@/lib/schema/checkoutSchema";
const Page = () => {
    const { checkoutCart } = useAppSelector(state => state.cart)
    const { statusCode, message } = useAppSelector(state => state.checkout)
    const { toast } = useToast()
    useEffect(() => {
        if (statusCode === 201) {
            toast({
                description: message
            })
        }
    }, [statusCode, message, toast])
    const dispatch = useAppDispatch();
    return (
        <div className="px-24 py-8 bg-ghostWhite ">
            <Suspense fallback={<Loading />}>
                <Accordion
                    type="multiple"
                    defaultValue={["item-4", "item-1"]}
                    className=""
                >
                    <Formik
                        initialValues={{}}
                        validationSchema={checkoutSchema}
                        onSubmit={(values, { setSubmitting }) => {
                            dispatch(checkoutApi({ values, checkoutCart }))
                        }}
                    >
                        {(formik) => (
                            <Form className="w-full grid grid-cols-3  gap-8">
                                <CustomerDetails />
                                <SummaryCheckout />
                            </Form>
                        )}
                    </Formik>
                </Accordion>
            </Suspense>
        </div>
    );
};

export default Page;
