
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { useAppSelector } from "@/lib/redux/hooks"
import React from "react"

interface AccordionProps {
    selectedProduct: {
        // imageData: []
        description: string
    }
}
const AccordionProduct: React.FC<AccordionProps> = ({ selectedProduct }) => {
    // const { selectedProduct } = useAppSelector((state) => state.products)
    return (
        <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
                <AccordionTrigger>Description</AccordionTrigger>
                <AccordionContent className="capitalize">
                    {selectedProduct?.description}
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
                <AccordionTrigger>Desclaimer</AccordionTrigger>
                <AccordionContent>
                    Yes. It comes with default styles that matches the other
                    components&apos; aesthetic.
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
                <AccordionTrigger>Instructions</AccordionTrigger>
                <AccordionContent>
                    Yes. It&apos;s animated by default, but you can disable it if you
                    prefer.
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}

export default AccordionProduct
