import { useAppDispatch } from "@/lib/redux/hooks";
import { ADD_TO_CART, DECREMENT, INCREMENT } from "@/lib/redux/slices/cart/cartSlice";
import React, { useState } from "react"
interface Props {
    product?: object,
    quantity?: number,
    id: string | undefined
}
const QuantitySelector: React.FC<Props> = ({ quantity, id }) => {
    const dispatch = useAppDispatch()
    const [value, setValue] = useState(quantity || 1);
    const handleIncrement = () => {
        setValue(value + 1);
        dispatch(INCREMENT({ id: id }))
    }
    const handleDecrement = () => {
        if (value > 1) setValue(value - 1);
        dispatch(DECREMENT({ id: id }))
    }
    return (
        <div className="font-medium grid grid-cols-4 h-8 place-items-center select-none rounded-full w-28 border">
            <p onClick={handleDecrement} className="border-r cursor-pointer px-3 select-none">-</p>
            <p className=" col-span-2">{value}</p>
            <p onClick={handleIncrement} className="border-l px-3 cursor-pointer select-none">+</p>
        </div>
    )
}

export default QuantitySelector
