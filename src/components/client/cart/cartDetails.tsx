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
import { REMOVE_FROM_CART } from "@/lib/redux/slices/client/cart/cartSlice";
const CartDetails = () => {
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.cart.items);
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow className="grid grid-cols-6">
            <TableHead className="col-span-3 px-0">Product</TableHead>
            <TableHead>Price</TableHead>
            <TableHead className="text-right">Item Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((product, index) => (
            <TableRow key={index} className="grid grid-cols-6">
              <TableCell className="font-medium col-span-3">
                <div className="grid grid-cols-2">
                  <div className="h-[150px] flex items-center justify-end">
                    <Image
                      src={product?.imageData[0]}
                      className="max-h-full w-auto rounded-sm"
                      width={200}
                      height={100}
                      alt="menshop"
                    />
                  </div>
                  <div className=" ml-3 flex flex-col items-start justify-between capitalize  ">
                    <Heading as="h6" className="line-clamp-3 text-sm">{product?.title}</Heading>

                    <QuantitySelector
                      _id={product._id}
                      quantity={product.quantity}
                    />

                    <Trash
                      onClick={() =>
                        dispatch(REMOVE_FROM_CART({ _id: product._id }))
                      }
                      className="text-xl cursor-pointer font-extralight"
                    />
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Text as="p">Rs. {product?.price}</Text>
              </TableCell>
              <TableCell className="text-right">
                <Text as="p">
                  Rs. {Math.round(product?.quantity * product?.price)}
                </Text>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CartDetails;
