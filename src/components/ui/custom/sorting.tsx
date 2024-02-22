import Text from "@/components/ui/typography/text"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import React from "react"
interface SortingProps {
    handleSortValue: (arg1: string) => void
}
const Sorting: React.FC<SortingProps> = ({ handleSortValue }) => {

    return (
        <div className="flex items-center">
            <Text as="p" className="mr-2 text-base">Sort By:</Text>
            <Select onValueChange={(value) => handleSortValue(value)} >
                <SelectTrigger className="w-[180px] h-8">
                    <SelectValue placeholder="Featured" />
                </SelectTrigger>
                <SelectContent >
                    <SelectItem value="asc">Alphabetically A to Z</SelectItem>
                    <SelectItem value="desc">Alphabetically Z to A</SelectItem>
                    <SelectItem value="lth">Price, Low to High</SelectItem>
                    <SelectItem value="htl">Price, High to Low</SelectItem>
                    {/* <SelectItem value="otn">Date, Old to New</SelectItem>
                    <SelectItem value="nto">Date, New to Old </SelectItem> */}
                </SelectContent>
            </Select>
        </div>
    )
}

export default Sorting
