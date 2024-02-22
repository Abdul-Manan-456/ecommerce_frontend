import { Field } from "formik"
import Currency from "../../../../public/icons/Currency"
import Heading from "@/components/ui/typography/heading"

const Payment = () => {
    return (
        <div className="flex items-center h-12 border bg-ghostWhite border-black px-2 p-10">
            <div className="flex  items-center">
                <Field type="radio" className="" name="method" value="cod" />
                <label className="ml-1">
                    COD
                </label>

                <Currency className="text-5xl ml-2 mr-16" />
            </div>

            <Heading as="h5">Payment will be collected at the time of delievery</Heading>
        </div>
    )
}

export default Payment
