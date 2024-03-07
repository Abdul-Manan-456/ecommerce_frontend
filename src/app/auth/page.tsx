'use client'


import Auth from "@/components/auth/auth"
import { Suspense } from "react"
import Loading from "./loading"


const Page = () => {

    return (
        <div className="flex items-center justify-center bg-ghostWhite h-[92vh]">
            <Suspense fallback={<Loading />} >
                <Auth />
            </Suspense>
        </div >

    )
}

export default Page
