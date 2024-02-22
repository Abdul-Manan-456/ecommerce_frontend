import { Button } from "@/components/ui/button"
import Link from "next/link"

const EmptyCart = () => {
    return (
        <div className="h-[510px]  flex flex-col items-center justify-center">

            <h3 className="text-3xl font-extrabold mb-10">Your Cart is Empty</h3>
            <Link href="/">
                <Button variant='default' className="hover:bg-success h-12 rounded-none w-40 font-medium mb-8" >Continue Shopping</Button>
            </Link>
            <h4 className="text-xl font-medium mt-5 mb-2">Have an Account?</h4>
            <p className="font-light text-sm">
                <Link href="/auth">
                    <strong className="font-medium hover:underline">Login </strong>
                </Link>
                to checkout faster</p>
        </div >
    )
}

export default EmptyCart
