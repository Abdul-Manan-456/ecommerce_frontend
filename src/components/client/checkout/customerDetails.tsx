
import Payment from "@/components/client/checkout/payment"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import Input, { InputSelect } from "@/components/ui/custom/Input"
import Heading from "@/components/ui/typography/heading"
import Text from "@/components/ui/typography/text"
import { useAppSelector } from "@/lib/redux/hooks"
const CustomerDetails = () => {
    const items = useAppSelector((state) => state.cart.items)
    const inputData = [
        { label: "First Name", name: "fname", placeholder: "e.g; abdul" },
        { label: "Last Name", name: "lname", placeholder: "e.g; manan" },
        { label: "Mobile Number", name: "phone", placeholder: "e.g; 0304 1234567" },
        { label: "City", name: "city", placeholder: "e.g; lahore" },
        { label: "Address", name: "address", placeholder: "e.g; lahore", colSpan: 2 },
        { label: "Near Any Famouse Place", name: "nearPlace", placeholder: "e.g; Ali Karyana Store or Waseem Marriage Hall", colSpan: 3 },
    ];
    return (
        <div className="col-span-2">
            <AccordionItem value="item-1" className="border-none bg-white box_shadow   px-6 py-2 box-border rounded-sm">
                <AccordionTrigger><Heading as="h6">Step-1 Enter Email</Heading></AccordionTrigger>
                <AccordionContent>
                    <div className="mt-2">
                        <Text as="p" className="text-sm mb-2">Already have an Account <strong className="cursor-pointer hover:underline">Login</strong></Text>
                        <Input label="Email" name="email" placeholder="e.g; abdulmanan@gmail.com" />
                    </div>
                </AccordionContent>
            </AccordionItem >
            <AccordionItem className="border-none bg-white box_shadow my-4 px-6 py-2 box-border rounded-sm" value="item-2">
                <AccordionTrigger>Step-2 Shipping</AccordionTrigger>
                <AccordionContent >
                    <Heading as="h5">Customer Details</Heading>
                    <div className="grid grid-cols-2 gap-5 space-y-2">
                        {inputData.map((input, index) => (
                            <div key={index} className={input.colSpan && input.colSpan >= 2 ? 'col-span-2' : ''}>
                                <Input
                                    label={input.label}
                                    name={input.name}
                                    placeholder={input.placeholder}
                                />
                            </div>
                        ))}

                        <InputSelect name="province" label="Select Region" >
                            <option value="punjab">Punjab</option>
                            <option value="kpk">KPK</option>
                            <option value="ajk">AJK</option>
                            <option value="Sindh">Sindh</option>
                            <option value="balochistan">Balochistan</option>
                        </InputSelect>
                    </div>
                </AccordionContent>
            </AccordionItem>
            <AccordionItem className="border-none bg-white box_shadow   px-6 py-2 box-border rounded-sm" value="item-3">
                <AccordionTrigger>Step-3 Payment</AccordionTrigger>
                <AccordionContent>
                    <Payment />
                </AccordionContent>
            </AccordionItem>
        </div>
    )
}

export default CustomerDetails
