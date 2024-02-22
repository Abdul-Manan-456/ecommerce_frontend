
import Image from "next/image";
import Trash from "../../../../public/icons/Trash";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import Heading from "@/components/ui/typography/heading";
import Text from "@/components/ui/typography/text";
import QuantitySelector from "@/components/ui/quantitySelector";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { REMOVE_FROM_CART } from "@/lib/redux/slices/cart/cartSlice";
const CartDetails = () => {
    const dispatch = useAppDispatch()
    const items = useAppSelector((state) => state.cart.items)
    return (
        <div>
            <Table>
                <TableHeader>
                    <TableRow className="grid grid-cols-6">
                        <TableHead className="col-span-3 px-0">
                            Product
                        </TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead className="text-right">Item Total</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        items.map((product, index) => (
                            <TableRow key={index} className="grid grid-cols-6">
                                <TableCell className="font-medium col-span-3">
                                    <div className="grid grid-cols-2">
                                        <div className="h-[140px] flex items-center justify-end">
                                            <Image
                                                src={product?.image}
                                                className="max-h-full w-auto rounded-sm"
                                                width={200}
                                                height={100}
                                                alt="menshop"
                                            />
                                        </div>
                                        <div className=" ml-3 flex flex-col items-start justify-between  ">
                                            <Heading as="h6">{product?.title}</Heading>

                                            <QuantitySelector id={product.id} quantity={product.quantity} />

                                            <Trash onClick={() => dispatch(REMOVE_FROM_CART({ id: product.id }))} className="text-xl cursor-pointer font-extralight" />
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Text as="p">Rs. {product?.price}</Text>
                                </TableCell>
                                <TableCell className="text-right">
                                    <Text as="p">Rs.  {Math.round(product?.quantity * product?.price)}</Text>
                                </TableCell>
                            </TableRow>
                        ))
                    }

                </TableBody>
            </Table>
        </div>
    )
}

export default CartDetails
